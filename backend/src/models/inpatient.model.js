const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const inpatientSchema = mongoose.Schema(
  {
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
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    admissionDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dischargeDate: {
      type: Date,
    },
    diagnosis: {
      type: String,
      required: true,
      trim: true,
    },
    treatment: {
      type: String,
      trim: true,
    },
    isDischarged: {
      type: Boolean,
      default: false,
    },
    totalBill: {
      type: Number,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Admitted', 'Under Treatment', 'Discharged'],
      default: 'Admitted',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
inpatientSchema.plugin(toJSON);
inpatientSchema.plugin(paginate);

/**
 * @typedef Inpatient
 */
const Inpatient = mongoose.model('Inpatient', inpatientSchema);

module.exports = Inpatient;
