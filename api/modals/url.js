import mongoose, { Schema } from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortid: { type: String, required: true, unique: true },
    redirectURL: { type: String, required: true },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const URL = mongoose.model("Urls", urlSchema);
