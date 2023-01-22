//registro y loguin
const { Router } = require('express');
const { register, login } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

//router get/post/create/put, delete
router.post('/register', register);
router.post("/login", login);

module.exports = router;


