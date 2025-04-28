const mongoose = require('mongoose');

const laboratorySchema = new mongoose.Schema(
  {
    labNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    }, 
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    tests: [
      {
        testName: { type: String, required: true },
        result: { type: String },
        normalRange: { type: String },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Laboratory = mongoose.model('Laboratory', laboratorySchema);

module.exports = Laboratory;
