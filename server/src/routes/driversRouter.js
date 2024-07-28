import { Router } from 'express';
import { getHandlerDrivers, getHandlerDriversById, getHandlerDriversByName, postHandlerDriver } from '../handlers/driversHandlers.js';

const driversRouter = Router();

driversRouter.get('/', getHandlerDrivers);

driversRouter.get('/driver/', getHandlerDriversByName);
//http://localhost:3001/drivers/driver?name=Nick

driversRouter.get('/:id', getHandlerDriversById);
//http://localhost:3001/drivers/1

driversRouter.post('/', postHandlerDriver);
// {
//     "forename": "John",
//     "surname": "Doe",
//     "description": "A new driver",
//     "image": "http://example.com/image.jpg",
//     "nationality": "American",
//     "teams": ["Team A", "Team B"],
//     "dob": "1990-01-01"
// }

export default driversRouter;
