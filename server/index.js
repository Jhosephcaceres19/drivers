import axios from 'axios';
import server from './src/app/app.js';
import { conn } from './src/app/db.js';
const PORT = 3001;

conn.sync({ force: true }).then(() => { 
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch(error => console.error(error));
