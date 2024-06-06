import express from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import pathErrorHandler from './app/middlewares/pathErrorHandler';
import router from './app/routes';

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
// Middleware to enable CORS for handling cross-origin requests
app.use(cors());

// Use the main router for handling all routes starting from '/'
app.use('/api/v1/', router);


// Middleware to handle any undefined routes (i.e., catch-all for 404 errors)
app.use('*', pathErrorHandler);

// Middleware to handle all global errors
app.use(globalErrorHandler);

export default app;
