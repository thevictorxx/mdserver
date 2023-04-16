require("dotenv").config();
const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log("████████████████████████████████████")
  console.log("███                              ███")
  console.log("███           MD Server          ███")
  console.log("███                              ███")
  console.log("████████████████████████████████████")
  console.log(`Puerto: ${process.env.PORT}`);
  console.log(`Access Token Expires: ${process.env.ACCESS_TOKEN_EXPIRES_IN}`);
  console.log(`http://localhost:${process.env.PORT}`);
  console.log(`${process.env.HOST}`);
});
