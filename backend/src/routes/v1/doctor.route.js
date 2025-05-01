const express = require('express');
const validate = require('../../middlewares/validate');
const doctorValidation = require('../../validations/doctor.validation');
const doctorController = require('../../controllers/doctor.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(doctorValidation.createDoctor), doctorController.createDoctor)
  .get(validate(doctorValidation.getDoctors), doctorController.getDoctors);

router
  .route('/:doctorId')
  .get(validate(doctorValidation.getDoctor), doctorController.getDoctor)
  .patch(validate(doctorValidation.updateDoctor), doctorController.updateDoctor)
  .delete(validate(doctorValidation.deleteDoctor), doctorController.deleteDoctor);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Doctor management and retrieval
 */

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create a doctor
 *     description: Only admins can create doctors.
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - age
 *               - gender
 *               - address
 *               - specialty
 *               - phoneNumber
 *               - email
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *                 enum: [male, female, other, unknown]
 *               address:
 *                 type: string
 *               specialty:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *             example:
 *               firstName: John
 *               lastName: Doe
 *               age: 35
 *               gender: male
 *               address: 123 Main St
 *               specialty: Cardiology
 *               phoneNumber: "+923302411283"
 *               email: johndoe@example.com
 *     responses:
 *       "201":
 *         description: Doctor created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       "400":
 *         description: Bad request (e.g., duplicate email)
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all doctors
 *     description: Retrieve a list of doctors.
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by name
 *       - in: query
 *         name: specialty
 *         schema:
 *           type: string
 *         description: Filter by specialty
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field:asc/desc (e.g., age:asc)
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
 *                     $ref: '#/components/schemas/Doctor'
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
 * /doctors/{doctorId}:
 *   get:
 *     summary: Get a doctor
 *     description: Retrieve a specific doctor by ID.
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a doctor
 *     description: Only admins can update a doctor.
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *                 enum: [male, female, other, unknown]
 *               address:
 *                 type: string
 *               specialty:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *             example:
 *               firstName: John
 *               lastName: Doe
 *               age: 35
 *               gender: male
 *               address: 123 Main St
 *               specialty: Cardiology
 *               phoneNumber: "+923302411283"
 *               email: johndoe@example.com
 * 
 * 
 *     responses:
 *       "200":
 *         description: Doctor updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
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
 *     summary: Delete a doctor
 *     description: Only admins can delete a doctor.
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
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
