const Area = require("../model/areaModel");

exports.addAreaMeasuring = async (req, res) => {
  try {
    const area = new Area(req.body);
    const savedArea = await area.save();
    res.status(201).json({
      success: true,
      message: "Area measuring data added successfully",
      data: savedArea,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getAreaMeasuring = async (req, res) => {
  try {
    const areas = await Area.find();
    res.status(200).json({
      success: true,
      message: "Area measuring data fetched successfully",
      data: areas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching area data",
      error: error.message,
    });
  }
};

exports.updateAreaMeasuring = async (req, res) => {
  try {
    const areaId = req.params.id;
    const updatedData = req.body;

    const updatedArea = await Area.findByIdAndUpdate(areaId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedArea) {
      return res.status(404).json({
        success: false,
        message: "Area not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Area measuring data updated successfully",
      data: updatedArea,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating area data",
      error: error.message,
    });
  }
};

exports.softDeleteAreaMeasuring = async (req, res) => {
  try {
    const areaId = req.params.id;

    const updatedArea = await Area.findByIdAndUpdate(
      areaId,
      { isActive: false },
      { new: true }
    );

    if (!updatedArea) {
      return res.status(404).json({
        success: false,
        message: "Area not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Area measuring data deactivated successfully",
      data: updatedArea,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while deactivating area data",
      error: error.message,
    });
  }
};
