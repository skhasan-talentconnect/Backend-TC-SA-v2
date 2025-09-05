import express from "express";
import ensureAuthenticated from "../middlewares/validate-token-middleware.js";
import {
  addSchool, getSchoolById, getSchoolsByStatus, updateSchoolInfo, deleteSchool, uploadSchoolPhotos,
  uploadSchoolVideo,
  deleteSchoolPhoto,
  deleteSchoolVideo,
  getSchoolPhoto,
  getSchoolVideos,
  getSchoolPhotos,
  getSchoolVideo
} from '../controllers/school-controllers.js';
import { addAmenities, getAmenitiesById, updateAmenities } from '../controllers/amenities-controllers.js';
import { addActivities, getActivitiesById, updateActivities } from '../controllers/activities-controllers.js';
import { addAlumni, getAlumniBySchool, deleteAlumniBySchool, updateAlumniBySchool } from '../controllers/alumni-controllers.js';
import { searchSchool } from '../controllers/search-controllers.js';
import { compareSchools } from "../controllers/compare-controllers.js";
import { getSchoolByFeeRange, getSchoolByShift } from '../controllers/filter-controllers.js';
import { getSchoolCardData } from "../controllers/card-controllers.js";
import { addSupport, getSupportByStudId, getSupportBySupId, deleteSupportBySupId } from '../controllers/support-controllers.js';
import { predictSchools } from "../controllers/predictor-controllers.js";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
} from "../controllers/blog-controllers.js";
import { photoUpload, videoUpload } from '../../config/multer.js';

const router = express.Router();

router.post('/:id/upload/photos', photoUpload.array('files', 4), uploadSchoolPhotos); // 5MB limit
router.post('/:id/upload/video', videoUpload.single('file'), uploadSchoolVideo); // 20MB limit
router.delete('/:id/photo/:publicId', deleteSchoolPhoto);
router.delete('/:id/video/:publicId', deleteSchoolVideo);

router.get('/:id/photos', getSchoolPhotos); // Get all photos
router.get('/:id/videos', getSchoolVideos); // Get all videos
router.get('/:id/photo/:publicId', getSchoolPhoto); // Get specific photo
router.get('/:id/video/:publicId', getSchoolVideo); // Get specific video

// Schools
router.post('/schools/', addSchool);
router.get('/schools/status/:status', getSchoolsByStatus);
router.get('/schools/:id', getSchoolById);
router.put('/schools/:id', updateSchoolInfo);
router.delete('/schools/:id', deleteSchool);

// Amenities
router.post('/schools/amenities/', addAmenities);
router.get('/schools/amenities/:id', getAmenitiesById);
router.put('/schools/amenities/:id', updateAmenities);

// Activities
router.post('/schools/activities/', addActivities);
router.get('/schools/activities/:id', getActivitiesById);
router.put('/schools/activities/:id', updateActivities);

//Alumni
router.post("/alumnus", ensureAuthenticated, addAlumni);
router.get("/alumnus/:id", getAlumniBySchool);
router.put("/alumnus/:id", ensureAuthenticated, updateAlumniBySchool);
router.delete("/alumnus/:id", ensureAuthenticated, deleteAlumniBySchool);

//Searching Schools
router.get("/search", searchSchool);
router.post("/compare", compareSchools);
router.get('/filter-feeRange', getSchoolByFeeRange);
router.get('/filter-Shift', getSchoolByShift);

router.get("/card/:id", getSchoolCardData);

router.post('/support', ensureAuthenticated, addSupport);
router.get('/support/:studId', getSupportByStudId);
router.get('/support-id/:supportId', getSupportBySupId);
router.delete('/support/:supportId', ensureAuthenticated, deleteSupportBySupId);

router.post('/predict-schools', predictSchools);

router.post("/blogs", createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);

export default router;