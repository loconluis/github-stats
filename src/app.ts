import express from 'express';
import dotenv from 'dotenv';
import { statsRouter } from './routes/stats.routes';
import errorHandler from './middleware/errorHandler';
dotenv.config();

const app = express();
app.use('/', statsRouter);
app.use(errorHandler);

export default app;
