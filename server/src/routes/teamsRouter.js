import { Router } from 'express';
import { getHandlerTeams } from '../handlers/teamsHandlers.js';

const teamsRouter = Router();

teamsRouter.get('/', getHandlerTeams);

export default teamsRouter;
