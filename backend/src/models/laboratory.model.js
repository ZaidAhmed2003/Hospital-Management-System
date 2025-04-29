const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const laboratorySchema = mongoose.Schema(
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
        testName: { type: String, required: true, trim: true },
        result: { type: String, trim: true },
        normalRange: { type: String, trim: true },
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

laboratorySchema.plugin(toJSON);
laboratorySchema.plugin(paginate);

/**
 * @typedef Laboratory
 */

const Laboratory = mongoose.model('Laboratory', laboratorySchema);

module.exports = Laboratory;
