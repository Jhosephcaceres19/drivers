import { Router } from 'express';
import driversRouter from './driversRouter.js';
import teamsRouter from './teamsRouter.js';

const mainRouter = Router();

mainRouter.use('/drivers', driversRouter);

mainRouter.use('/teams', teamsRouter);


export default mainRouter;
