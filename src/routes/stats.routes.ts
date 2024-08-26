import { Router } from 'express';
import StatsController from '../controllers/stats.controller';

const statsRouter = Router();

// Wierd behavior with this inside the class
// solution was bind the functions with the class
statsRouter.get(
  '/stats/:username',
  StatsController.getStats.bind(StatsController)
);
statsRouter.get(
  '/stats',
  StatsController.getMultipleStats.bind(StatsController)
);

export { statsRouter };
