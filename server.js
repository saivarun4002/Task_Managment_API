import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


import taskRoutes from './routes/taskRoutes.js';
import authRouter from './routes/userRoutes.js';
import {auth} from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5007;


app.use(bodyParser.json());

// For establishing the database connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB connected'))
    .catch((error) => {
        console.error('❌ Database connection error:', error);
        process.exit(1);
    });

// Public Routes
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Welcome to the Task Management API!' });
});

// Public Routes (no authentication required)
app.use('/api/auth', authRouter);

// Protected Routes (require authentication)
app.use('/api/tasks', auth, taskRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

authRouter.post('/register', (req, res) => {
    res.status(200).json({ success: true, message: 'Test: Register route works!' });
});

