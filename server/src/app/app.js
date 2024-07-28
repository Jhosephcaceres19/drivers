import express from 'express';
import mainRouter from '../routes/mainRouter.js'; // Asegúrate de que el archivo tenga la extensión '.js'
import morgan from 'morgan';
import cors from 'cors';

const server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(cors());

server.use(mainRouter);

export default server;
