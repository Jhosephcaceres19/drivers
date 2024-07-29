import { Router } from 'express';
import { getHandlerDrivers, getHandlerDriversById, getHandlerDriversByName, postHandlerDriver } from '../handlers/driversHandlers.js';

const driversRouter = Router();

driversRouter.get('/', getHandlerDrivers);
//http://localhost:3001/drivers

driversRouter.get('/driver/', getHandlerDriversByName);
//http://localhost:3001/drivers/driver?name=Nick

driversRouter.get('/:id', getHandlerDriversById);
//http://localhost:3001/drivers/1

driversRouter.post('/', postHandlerDriver);
////http://localhost:3001/drivers
// {
//     "forename": "John",
//     "surname": "Doe",
//     "description": "A new driver",
//     "image": "https://pbs.twimg.com/profile_images/1301250347822968833/VgxlK9pY_200x200.jpg",
//     "nationality": "American",
//     "teams": ["Team A", "Team B"],
//     "dob": "1990-01-01"
// }

export default driversRouter;
