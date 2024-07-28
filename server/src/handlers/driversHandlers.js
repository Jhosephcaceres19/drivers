import { driversController } from '../controllers/driversController.js'; // Usa '.js' si es un módulo ES
import { idDriversController } from '../controllers/IdDriversController.js';
import { nameDriversController } from '../controllers/nameDriversController.js';
import { postDriversController } from '../controllers/postDriversController.js';

const getHandlerDrivers = async (req, res) => {
  try {
    const respuesta = await driversController();

    res.status(200).json({
      message: 'Data retrieved and saved successfully',
      respuesta,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getHandlerDriversById = async (req, res) => {
  try {
    const { id } = req.params; // en este caso req está llegando por params; id se desestructura
    const respuesta = await idDriversController(id);
    res.status(200).send({
      message: `User details with id: ${id}`,
      respuesta,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getHandlerDriversByName = async (req, res) => {
  try {
    const { name } = req.query; // en este caso req está llegando por query
    const respuesta = await nameDriversController(name);
    res.status(200).send({
      message: name,
      answer: respuesta,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const postHandlerDriver = async (req, res) => {
  try {
    const { forename, surname, description, image, nationality, teams, dob } = req.body;
    const DataDriver = await postDriversController(forename, surname, description, image, nationality, teams, dob);
    res.status(200).send({
      answer: {
        DataDriver,
      },
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
  getHandlerDrivers,
  getHandlerDriversById,
  getHandlerDriversByName,
  postHandlerDriver
};
