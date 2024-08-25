import { Router } from 'express';
import { getStats } from '../controllers/stats.controller';

const statsRputer = Router();

statsRputer.get('/stats/:username', getStats);
statsRputer.get('/stats', getStats);

export { statsRputer };
