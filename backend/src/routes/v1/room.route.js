const express = require('express');
const validate = require('../../middlewares/validate');
const roomValidation = require('../../validations/room.validation');
const roomController = require('../../controllers/room.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(roomValidation.createRoom), roomController.createRoom)
  .get(validate(roomValidation.getRooms), roomController.getRooms);

router
  .route('/:roomId')
  .get(validate(roomValidation.getRoom), roomController.getRoom)
  .patch(validate(roomValidation.updateRoom), roomController.updateRoom)
  .delete(validate(roomValidation.deleteRoom), roomController.deleteRoom);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room management and retrieval
 */

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Create a room
 *     description: Only admins can create rooms.
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomNo
 *               - roomType
 *               - roomCharge
 *             properties:
 *               roomNo:
 *                 type: string
 *               roomType:
 *                 type: string
 *                 enum: [General, Semi-Private, Private, ICU]
 *               status:
 *                 type: string
 *                 enum: [Available, Occupied, Maintenance]
 *                 default: Available
 *               roomCharge:
 *                 type: number
 *                 minimum: 0
 *             example:
 *               roomNo: "101A"
 *               roomType: "ICU"
 *               status: "Available"
 *               roomCharge: 10000
 *     responses:
 *       "201":
 *         description: Room created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       "400":
 *         description: Bad request
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all rooms
 *     description: Retrieve a list of rooms.
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: roomType
 *         schema:
 *           type: string
 *         description: Filter by room type
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by room status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Max items per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Room'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalResults:
 *                   type: integer
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /rooms/{roomId}:
 *   get:
 *     summary: Get a room
 *     description: Retrieve a specific room by ID.
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a room
 *     description: Only admins can update a room.
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomNo:
 *                 type: string
 *               roomType:
 *                 type: string
 *                 enum: [General, Semi-Private, Private, ICU]
 *               status:
 *                 type: string
 *                 enum: [Available, Occupied, Maintenance]
 *               roomCharge:
 *                 type: number
 *                 minimum: 0
 *     responses:
 *       "200":
 *         description: Room updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       "400":
 *         description: Validation error
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a room
 *     description: Only admins can delete a room.
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
