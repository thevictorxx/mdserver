require("dotenv").config();
const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(`Corriendo en puerto ${process.env.PORT}`);
  console.log(`http://localhost:${process.env.PORT}`);
});
