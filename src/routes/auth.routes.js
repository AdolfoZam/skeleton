//registro y loguin
const { Router } = require('express');
const { register } = require('../controllers/auth.controller');

const router = Router();

//router get/post/create/put, delete
router.post('/register', register);
router.post("/login", login);
module.exports = router;


