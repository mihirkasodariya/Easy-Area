const { conversionRates } = require("../model/convertModel");

const turf = require("@turf/turf");

exports.areaMeasuring = (socket, payload) => {
  console.log("Payload received:", payload);
  const pins = payload?.pins;
  if (!Array.isArray(pins) || pins.length < 3) {
    return socket.emit("areaResult", {
      success: false,
      status: 400,
      message: "At least 3 coordinates are required to calculate area.",
    });
  }

  try {
    const coordinates = pins.map(p => [p.longitude, p.latitude]);
    coordinates.push([pins[0].longitude, pins[0].latitude]); 
    const polygon = turf.polygon([coordinates]);
    const areaInSqMeters = turf.area(polygon);
    const areaInSqFeet = areaInSqMeters * 10.7639;

    const result = {};
    for (const [unit, rate] of Object.entries(conversionRates)) {
      result[unit] = parseFloat((areaInSqFeet / rate).toFixed(2));
    };
    return socket.emit("areaResult", {
      success: true,
      status: 200,
      message: "Area calculated successfully.",
      data: {
        ...result,
      },
    });
  } catch (error) {
    console.error("Error calculating area:", error);
    return socket.emit("areaResult", {
      success: false,
      status: 500,
      message: "An error occurred while calculating the area.",
    });
  }
};




// exports.convertArea = (req, res) => {
//   const { value, fromUnit } = req.body;

//   if (!value || !fromUnit) {
//     return res.status(400).json({ error: "value and fromUnit are required." });
//   }

//   const fromRate = conversionRates[fromUnit];
//   if (!fromRate) {
//     return res.status(400).json({ error: `Unknown unit: ${fromUnit}` });
//   }

//   const sqMeters = value * fromRate;

//   const result = {};
//   // console.log("conversionRates", conversionRates);
//   for (const [unit, rate] of Object.entries(conversionRates)) {
//     console.log("unit", rate);
//     result[unit] = +(sqMeters / rate).toFixed(2);
//   }

//   return res.json({
//     input: { value, fromUnit },
//     result,
//   });
// };

// exports.areaMeasuring = (socket, payload) => {
//   const { value, fromUnit } = payload;
//   console.log('etedsaydghy',payload)
//   // Validate input
//   if (typeof value !== "number" || isNaN(value)) {
//     return socket.emit("areaResult", {
//       success: false,
//       status: 400,
//       message: "'value' must be a valid number.",
//     });
//   }

//   if (!fromUnit || typeof fromUnit !== "string") {
//     return socket.emit("areaResult", {
//       success: false,
//       status: 400,
//       message: "'fromUnit' is required and must be a string.",
//     });
//   }

//   // const normalizedUnit = fromUnit.toLowerCase();
//   console.log('normalizedUnit', fromUnit)
//   const fromRate = conversionRates[fromUnit];
// console.log('fromRate', fromRate)
//   if (!fromRate || typeof fromRate !== "number" || fromRate <= 0) {
//     return socket.emit("areaResult", {
//       success: false,
//       status: 400,
//       message: `Invalid or unsupported 'fromUnit': ${fromUnit}`,
//     });
//   }

//   // Convert to square feet
//   const valueInSqFeet = value * fromRate;

//   // Generate conversions
//   const result = {};
//   for (const [unit, rate] of Object.entries(conversionRates)) {
//     if (typeof rate === "number" && rate > 0) {
//       result[unit] = parseFloat((valueInSqFeet / rate).toFixed(2));
//     }
//   }

//   // Emit result
//   socket.emit("areaResult", {
//     success: true,
//     status: 200,
//     message: "Area successfully converted.",
//     data: {
//       input: { value, fromUnit: fromUnit },
//       result,
//     },
//   });
// };