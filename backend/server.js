import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js';
import userRoutes from './routes/userRoutes.js';

// Add enviroment variables
dotenv.config();

// Connect to Database
connectDB();

// Initialize the app
const app = express();

const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json()); // Parse the req.body from json to js in req.body
app.use(express.urlencoded({ extended: true })); // Parse the HTML forms to js in req.body
app.use(cookieParser()); // parse the cookie

// Routes
app.get('/api/v1', (req, res) => {
  res.send('server is ready');
});
app.use('/api/v1/users', userRoutes);

// Error handlers middlewares
app.use(notFound);
app.use(errorHandler);

// Server listenning to requests
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
