const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { addToCart, getAllByUserId, updateQuantity, deleteItem } = require('../controlers/cart');


router.get("/:userId", auth, async (req, res) => {
  const userId = req.params.userId;
  try {
    const items = await getAllByUserId(userId);
    res.status(200).json(items)
  } 
  catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
router.post("/", auth, async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!(productId && userId && quantity )) {
      return res.status(400).send("בקשה לא תקינה");
    }
    const createItem = await addToCart(userId, productId, quantity );
    res.status(200).json(createItem);
  } 
  catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
router.patch('/:id',auth, async (req, res) => {
  const itemId = req.params.id;
  const quantity = req.body.quantity;
  try {
    const item = await updateQuantity(itemId, quantity);
    res.status(200).json(item)
  } 
  catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
router.delete('/:id',auth, async (req, res) => {
  try {
    const itemId = req.params.id;
    deleteItem(itemId)
    .then(()=>{
      res.status(200).send(true)
    })
    .catch((err)=>{
      res.status(400).send(err)
    })
  } 
  catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;