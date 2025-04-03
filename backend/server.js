import express from 'express';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
import  connectMongoDb  from './db/connectMongoDb.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests
app.use(cookieParser()); // Middleware to parse cookies
app.use('/api/auth', authRoutes) 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDb();
})