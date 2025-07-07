const response = require("../utils/response");
const { coordinatesArraySchema } = require("../model/distanceModel");

const haversineDistance = (coords1, coords2) => {
  const toRad = angle => (angle * Math.PI) / 180;
  const R = 6371000; // Earth radius in meters
  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

exports.handleCalculateDistance = async (socket, { waypoints }) => {
  try {
    const { error } = coordinatesArraySchema.validate(waypoints);
    if (error) {
      return socket.emit("waypointsResult", {
        success: false,
        status: 400,
        message: error.details[0].message,
      });
    }

    let totalDistance = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      totalDistance += haversineDistance(waypoints[i], waypoints[i + 1]);
    }

    socket.emit("waypointsResult", {
      success: true,
      status: 200,
      message: "Distance calculated.",
      data: {
        distanceInMeters: totalDistance,
        waypoints,
      },
    });
  } catch (err) {
    console.error("Socket error:", err);
    socket.emit("waypointsResult", {
      success: false,
      status: 500,
      message: "Internal server error while handling waypoints.",
    });
  }
};
