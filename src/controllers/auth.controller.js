const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  getAccountByMail,
  getAccountByUsername,
  createAccount,
} = require("../database/Account");

const signin = (req, res) => {
  res.render("signin");
};

const signup = (req, res) => {
  res.render("signup");
};

const signinController = async (req, res) => {
  const { username, pass } = req.body;

  const [user] = await getAccountByUsername(username);

  if (!user) {
    return res.status(401).json({ error: 5, message: "Invalid credentials" });
  }

  const comparePassword = await bcrypt.compare(pass, user.pass);

  if (!comparePassword) {
    res.status(401).json({ error: 5, message: "Invalid credentials" });
    return;
  }

  const credenciales = {
    id: user.id,
    // username: user.username,
    // name: user.name,
    // lastname: user.lastname,
    // mail: user.mail,
    access: user.access,
  };

  const token = await jwt.sign(
    { credenciales },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: +process.env.ACCESS_TOKEN_EXPIRES_IN,
    }
  );

  res.cookie("access_token", "Bearer " + token);

  res.json({ token });
};

const signupController = async (req, res) => {
  const { username, name, lastname, pass, confirmPass, mail } = req.body;
  if (pass !== confirmPass) {
    res.json({ error: 1, message: "Passwords don't match" });
    return;
  }

  const checkAccountByEmail = await getAccountByMail(mail);
  if (checkAccountByEmail.length > 0) {
    res.json({ error: 2, message: "Email already exists" });
    return;
  }

  const checkAccountByUsername = await getAccountByUsername(username);
  if (checkAccountByUsername.length > 0) {
    res.json({ error: 3, message: "Username already exists" });
    return;
  }

  const isAccountCrated = createAccount(username, name, lastname, pass, mail);
  if (!isAccountCrated) {
    res.status(500).json({ error: 4, message: "Something went wrong" });
    return;
  }

  res.status(201).json({ username, name, lastname, mail });
};

module.exports = {
  signin,
  signup,
  signinController,
  signupController,
};
