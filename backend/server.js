import express from 'express';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
import  connectMongoDb  from './db/connectMongoDb.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes) 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDb();
})