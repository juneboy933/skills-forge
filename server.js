import express from 'express';
import dotenv from 'dotenv';
import cookieParse from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
const port = process.env.PORT;

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParse());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Skill forge');
});

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running from http://localhost:${port}`);
    });
});