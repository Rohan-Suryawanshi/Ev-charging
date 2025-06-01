import mongoose from "mongoose";

const StationSchema = new mongoose.Schema(
  {
    name: { required: true, type: String },
    location: {
      latitude: Number,
      longitude: Number,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    powerOutput: { type: Number, required: true },
    connectorType: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Station= mongoose.model("Station",StationSchema);
