const { conn } = require("./app/db");
require("dotenv").config();

const app = require("./app/app");

const port = process.env.PORT || 3001;

conn.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`server runing on port ${port}`);
  });
});