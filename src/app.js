import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../config/db.js";
import authRoutes from './routes/auth-routes.js'
import userRoutes from './routes/user-routes.js'
import schoolRoutes from './routes/school-routes.js'
import applicationRoutes from './routes/application-routes.js';
import reviewRoutes from './routes/review-routes.js'
import openAIRoutes from './routes/ai-routes.js';
import formRoutes from './routes/form-routes.js'
import notificationRoutes from './routes/notification-routes.js'
import ChatbotRoutes from './routes/chatbot-routes.js';
import { errorHandler } from './middlewares/cloudinary-error-handler.js';

dotenv.config();
connectDB();

const app = express();

// ✅ Middleware to handle form-data correctly
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes for the API calls
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', schoolRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/form', formRoutes);
app.use('/api', openAIRoutes); 
app.use('/api/chatbot',ChatbotRoutes) ;

app.use(errorHandler);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.use((err, req, res, next) => {
    console.error("Global Error:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: err.toString()
    });
});