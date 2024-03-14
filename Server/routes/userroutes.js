const { register, login, SetAvatar, getallusers } = require('../Controllers/usercontroller');

const router = require('express').Router();

router.post('/register',register);
router.post('/login', login);
router.post('/SetAvatar/:id', SetAvatar)
router.get('/getallusers/:id', getallusers)


module.exports = router;