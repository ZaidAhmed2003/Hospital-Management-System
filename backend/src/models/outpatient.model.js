const mongoose = require("mongoose");

const outpatientSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    visitDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    symptoms: {
      type: String,
      required: true,
      trim: true,
    },
    diagnosis: {
      type: String,
      trim: true,
    },
    prescription: {
      type: String,
      trim: true,
    },
    consultationFee: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Consulted", "Follow-up Needed", "Referred"],
      default: "Consulted",
    },
  },
  {
    timestamps: true,
  }
);

const Outpatient = mongoose.model("Outpatient", outpatientSchema);

module.exports = Outpatient;
