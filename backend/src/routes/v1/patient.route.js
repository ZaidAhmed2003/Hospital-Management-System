const express = require('express');
const validate = require('../../middlewares/validate');
const patientValidation = require('../../validations/patient.validation');
const patientController = require('../../controllers/patient.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(patientValidation.createPatient), patientController.createPatient)
  .get(validate(patientValidation.getPatients), patientController.getPatients);

router
  .route('/:patientId')
  .get(validate(patientValidation.getPatient), patientController.getPatient)
  .patch(validate(patientValidation.updatePatient), patientController.updatePatient)
  .delete(validate(patientValidation.deletePatient), patientController.deletePatient);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient management and retrieval
 */

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Create a patient
 *     description: Only admins can create patients.
 *     tags: [Patients]
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
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               emergencyContact:
 *                 type: string
 *               medicalHistory:
 *                 type: string
 *               doctor:
 *                 type: string
 *             example:
 *               firstName: Jane
 *               lastName: Doe
 *               age: 28
 *               gender: female
 *               address: 456 Elm St
 *               phoneNumber: "+923001234567"
 *               email: janedoe@example.com
 *               emergencyContact: "+923001112233"
 *               medicalHistory: Allergic to penicillin
 *               doctor: 6812469f1415e31c28f5f136
 *     responses:
 *       "201":
 *         description: Patient created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       "400":
 *         description: Bad request
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all patients
 *     description: Retrieve a list of patients.
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by name
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *         description: Filter by gender
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
 *                     $ref: '#/components/schemas/Patient'
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
 * /patients/{patientId}:
 *   get:
 *     summary: Get a patient
 *     description: Retrieve a specific patient by ID.
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a patient
 *     description: Only admins can update a patient.
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
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
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               emergencyContact:
 *                 type: string
 *               medicalHistory:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Patient updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
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
 *     summary: Delete a patient
 *     description: Only admins can delete a patient.
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
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
