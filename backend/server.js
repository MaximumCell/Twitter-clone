import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import cors from 'cors';
import  connectMongoDb  from './db/connectMongoDb.js';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json({limit: "5mb"})); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests
app.use(cookieParser()); // Middleware to parse cookies


app.use(cors({
    origin: 'http://localhost:3000', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow credentials like cookies
}));
app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes); 
app.use("/api/notifications", notificationRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')); 
    });
}



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDb();
})