import { Station } from "../models/station.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const createStation = AsyncHandler(async (req, res) => {
  const { name, location, status, powerOutput, connectorType } = req.body;

  if (!name) throw new ApiError(400, "Enter the name");
  if (!location) throw new ApiError(400, "Enter the location");
  if (!status) throw new ApiError(400, "Enter the status");
  if (!powerOutput) throw new ApiError(400, "Enter the powerOutput");
  if (!connectorType) throw new ApiError(400, "Enter the connector Type");

  const station = await Station.create({
    name,
    location,
    status,
    powerOutput,
    connectorType,
  });

  res
    .status(201)
    .json(new ApiResponse(201, station, "Station created successfully"));
});

const deleteStation = AsyncHandler(async (req, res) => {
  const stationId = req.params.id;

  if (!stationId) throw new ApiError(400, "Station ID is required");

  const station = await Station.findById(stationId);
  if (!station) throw new ApiError(404, "Station Not Found");

  await station.deleteOne();

  const stationResponse = {
    _id: station._id,
    name: station.name, 
    status: station.status,
  };

  res
    .status(200)
    .json(
      new ApiResponse(200, stationResponse, "Station Deleted Successfully")
    );
});

const getStation = AsyncHandler(async (req, res) => {
  const stationId = req.params.id;
  if (!stationId) throw new ApiError(400, "Station ID is required");

  const station = await Station.findById(stationId);
  if (!station) throw new ApiError(404, "Station Not Found");

  res
    .status(200)
    .json(new ApiResponse(200, station, "Station Retrieved Successfully"));
});

const getAllStations = AsyncHandler(async (req, res) => {
  const stations = await Station.find();
  res
    .status(200)
    .json(new ApiResponse(200, stations, "Stations retrieved successfully"));
});

const updateStation = AsyncHandler(async (req, res) => {
  const stationId = req.params.id;
  if (!stationId) throw new ApiError(400, "Station ID is required");

  const { name, location, status, powerOutput, connectorType } = req.body;

  const station = await Station.findById(stationId);
  if (!station) throw new ApiError(404, "Station Not Found");

  let isUpdated = false;

  if (name && station.name !== name) {
    station.name = name;
    isUpdated = true;
  }

  if (status && station.status !== status) {
    station.status = status;
    isUpdated = true;
  }

  if (powerOutput && station.powerOutput !== powerOutput) {
    station.powerOutput = powerOutput;
    isUpdated = true;
  }

  if (connectorType && station.connectorType !== connectorType) {
    station.connectorType = connectorType;
    isUpdated = true;
  }

  if (location) {
    if (
      station.location?.latitude !== location.latitude ||
      station.location?.longitude !== location.longitude
    ) {
      station.location = {
        latitude: location.latitude,
        longitude: location.longitude,
      };
      isUpdated = true;
    }
  }

  if (isUpdated) {
    await station.save();
    return res
      .status(200)
      .json(new ApiResponse(200, station, "Station Updated Successfully"));
  }

  res.status(200).json(new ApiResponse(200, station, "No changes were made"));
});

const getStations = AsyncHandler(async (req, res) => {
  const { status, powerOutput, connectorType } = req.query;

  // Build query object
  const query = {};

  if (status) {
    query.status = status;
  }

  if (connectorType) {
    query.connectorType = connectorType;
  }

  if (powerOutput) {
    if (powerOutput === "low") {
      query.powerOutput = { $lte: 50 };
    } else if (powerOutput === "medium") {
      query.powerOutput = { $gt: 50, $lte: 150 };
    } else if (powerOutput === "high") {
      query.powerOutput = { $gt: 150 };
    }
  }

  const stations = await Station.find(query);

  res
    .status(200)
    .json(new ApiResponse(200, stations, "Stations retrieved successfully"));
});

export {
  createStation,
  getAllStations,
  getStation,
  updateStation,
  deleteStation,
  getStations,
};
