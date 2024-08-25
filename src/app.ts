import express from 'express';
import dotenv from 'dotenv';
import { statsRputer } from './routes/stats.routes';
dotenv.config();

const app = express();
app.use('/', statsRputer);
export default app;
