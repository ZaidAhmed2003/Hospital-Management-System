const httpStatus = require('http-status');
const { Room } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a room
 * @param {Object} roomBody
 * @returns {Promise<Room>}
 */
const createRoom = async (roomBody) => {
  return Room.create(roomBody);
};

/**
 * Query for rooms
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const queryRooms = async (filter, options) => {
  const rooms = await Room.paginate(filter, options);
  return rooms;
};

/**
 * Get room by ID
 * @param {ObjectId} id
 * @returns {Promise<Room>}
 */
const getRoomById = async (id) => {
  return Room.findById(id);
};

/**
 * Update room by ID
 * @param {ObjectId} roomId
 * @param {Object} updateBody
 * @returns {Promise<Room>}
 */
const updateRoomById = async (roomId, updateBody) => {
  const room = await getRoomById(roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  Object.assign(room, updateBody);
  await room.save();
  return room;
};

/**
 * Delete room by ID
 * @param {ObjectId} roomId
 * @returns {Promise<Room>}
 */
const deleteRoomById = async (roomId) => {
  const room = await getRoomById(roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  await room.remove();
  return room;
};

module.exports = {
  createRoom,
  queryRooms,
  getRoomById,
  updateRoomById,
  deleteRoomById,
};
