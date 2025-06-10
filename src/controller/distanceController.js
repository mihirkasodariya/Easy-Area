const turf = require("@turf/turf");
const response = require("../utils/response");
const { distanceValidation, coordinatesArraySchema, Distance } = require("../model/distanceModel");
const { convertFromKaram, conversionFactors } = require("../utils/unitConverter");

exports.handleCalculateDistance = async (socket, { coordinates }) => {
  try {
    const { error } = coordinatesArraySchema.validate(coordinates);

    if (error) {
        return response.error(res, 400, error.details[0].message);
    };

    const options = { units: "kilometers" };
    let totalDistanceInKilometers = 0;

    for (let i = 0; i < coordinates.length - 1; i++) {
      const { latitude: lat1, longitude: lon1 } = coordinates[i];
      const { latitude: lat2, longitude: lon2 } = coordinates[i + 1];

      const point1 = turf.point([lon1, lat1]);
      const point2 = turf.point([lon2, lat2]);

      const segmentDistance = turf.distance(point1, point2, options);
      totalDistanceInKilometers += segmentDistance;
    };

    const totalDistanceInMeters = totalDistanceInKilometers * 1000;
    const karam = totalDistanceInMeters * conversionFactors.karam;
    const rawDistances = convertFromKaram(karam);

    const convertedDistances = {};
    for (const key in rawDistances) {
      convertedDistances[key] = Number(rawDistances[key].toFixed(2));
    };

    socket.emit("distanceResult", {
      success: true,
      status: 200,
      message: "Successfully calculated distance.",
      data: {
        distanceInMeters: Number(totalDistanceInMeters.toFixed(2)),
        ...convertedDistances,
      },
    });
  } catch (err) {
    console.error("Socket error:", err);
    socket.emit("distanceResult", {
      success: false,
      status: 500,
      message: "Internal server error",
    });
  };
};


exports.getAllDistances = async (req, res) => {
  try {
    const distances = await Distance.find({ isActive: true });
    return response.success(
      res,
      200,
      "Distance records fetched successfully",
      distances
    );
  } catch (err) {
    return response.error(res, 500, "Failed to fetch distance records");
  }
};

exports.deleteDistance = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await Distance.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    if (!deletedData) {
      return response.error(res, 404, "Distance record not found");
    }
    return response.success(res, 200, "Soft deleted successfully", deletedData);
  } catch (error) {
    console.error(error);
    return response.error(res, 500, "Internal Server Error");
  }
};
