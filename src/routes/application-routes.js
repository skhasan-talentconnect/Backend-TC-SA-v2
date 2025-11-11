// routes/application-routes.js
import express from 'express';
import {
  addStudApplication,
  getAllStudApplication,
  getStudApplicationsByStudId,
  getStudApplicationById,
  updateStudApplication,
  deleteStudApplication
} from '../controllers/application-controllers.js';

const router = express.Router();

router.post('/', addStudApplication);
router.get('/', getAllStudApplication);

// fetch all apps for a studId
router.get('/stud/:studId', getStudApplicationsByStudId);

// fetch one application by its own id
router.get('/:applicationId', getStudApplicationById);

// update and delete by applicationId
router.put('/:applicationId', updateStudApplication);
router.delete('/:applicationId', deleteStudApplication);

export default router;
