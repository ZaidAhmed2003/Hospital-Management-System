const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    roomNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    roomType: {
      type: String,
      enum: ['General', 'Semi-Private', 'Private', 'ICU'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Available', 'Occupied', 'Maintenance'],
      default: 'Available',
    },
    roomCharge: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
