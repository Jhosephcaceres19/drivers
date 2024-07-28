import { teamsController } from '../controllers/teamsController.js'; // Usa '.js' si es un módulo ES

const getHandlerTeams = async (req, res) => {
  try {
    const respuesta = await teamsController();
    res.status(200).json({
      respuesta,
      message: 'Data retrieved and saved successfully',
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getHandlerTeams };
