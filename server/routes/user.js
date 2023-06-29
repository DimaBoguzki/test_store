const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getByEmail, getById, register } = require('../controlers/user');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    getByEmail(email, password)
    .then((user)=>res.status(200).json(user))
    .catch((err)=>res.status(403).json(err))
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.post("/register", (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(email && password && name )) {
      return res.status(400).send("חובה למלא סיסמא מייל שם וסיסמא");
    }
    register(name, email, password)
    .then((user)=>res.status(200).json(user))
    .catch((err)=>res.status(403).send(err))
  } 
  catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const { user_id } = req.user;
    const user = await getById(user_id);
    if (user) {
      res.json(user);
    } 
    else {
      res.status(404).json({ message: 'User not found' });
    }
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
