const AuthServices = require("../services/auth.services");
const transporter = require("../utils/mailer");
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const user = req.body;
    const result = await AuthServices.register(user);
    if (result) {
      res.status(200).json({ message: "User created" });
      await transporter.sendMail({
        to: result.email,
        from: "adolfozamora1005@gmail.com",
        subject: "email confirmation",
        html: "<h1> Bienvenido a la mejor app hecha por mi </h1> <p> debes confirmar tu email </p><p>haz click en el siguiente <a href='#' 'target=' new_blank'> enlace </a>",
      });
    } else {
      res.status(400).json({ message: "something wrong" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        error: "Missing data",
        message: "Not email provided",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: "Missing data",
        message: "Not password provided",
      });
    }
    const result = await AuthServices.login({ email, password });
    if (result.wrongEmail) {
      res.status(400).json({ message: "Email invalid, please verify" });
    }
    if (result.wrongPassword) {
      res.status(400).json({ message: "Password invalid, please verify" });
    }
    if (result.isValid) {
      const { username, id, email } = result.user;
      const userData = { username, id, email };
      const token = AuthServices.genToken(userData);
      
      result.user.token = token;
      res.json(result.user);
      
    }
  } catch (error) {
    res.status(400).json({ message: "something wrong" });
  }
};

module.exports = {
  register,
  login,
};
