const express = require('express');
const router = express.Router();
const { getAll } = require('../controlers/products');
const auth = require('../middlewares/auth');


router.get('/', auth , async (req, res) => {
  try {
    const products = await getAll();
    res.status(200).json(products);
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
