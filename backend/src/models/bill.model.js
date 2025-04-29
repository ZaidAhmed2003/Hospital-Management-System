const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const billSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    inpatient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inpatient',
    },
    outpatient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Outpatient',
    },
    laboratory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Laboratory',
    },
    billingDate: {
      type: Date,
      default: Date.now,
    },
    items: [
      {
        description: { type: String, required: true },
        amount: { type: Number, required: true, min: 0 },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Unpaid', 'Paid', 'Cancelled'],
      default: 'Unpaid',
    },
    paymentMethod: {
      type: String,
      enum: ['Cash', 'Card', 'Insurance', 'Online'],
    },
  },
  {
    timestamps: true,
  }
);

billSchema.plugin(toJSON);
billSchema.plugin(paginate);

/**
 * @typedef Bill
 */
const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
