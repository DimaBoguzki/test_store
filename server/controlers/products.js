const { Product } = require('../models');

function getAll(){
  return Product.findAll();
}
module.exports={
  getAll
}