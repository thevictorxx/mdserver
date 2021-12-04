const { config } = require("dotenv");
const app = require("./app");
config();

app.listen(process.env.PORT, () => {
  console.log(`Corriendo en puerto ${process.env.PORT}`);
  console.log(`http://localhost:${process.env.PORT}`);
});
