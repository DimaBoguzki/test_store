const { Cart, Product } = require('../models');

async function addToCart(userId, productId, quantity){ 
  const item = await Cart.findOne({
    where: {
      UserId: userId,
      ProductId: productId,
    }
  });
  
  if (item) {
    item.quantity = quantity;
    return item.save();
  }
  else{
    const item = await Cart.create({ 
      ProductId: productId, 
      UserId:userId,
      quantity 
    });
    return Cart.findByPk(item.dataValues.id,{
      include:[Product]
    });
  }
}

function updateQuantity(itemID, quantity){ 
  return new Promise( ( resolve, reject ) => {
    Cart.findByPk(itemID,{include:[Product]})
    .then( async item => {
      if(item){
        item.quantity = quantity;
        resolve( await item.save() )
      }
      else{
        reject('Cart item not found');
      }
    } )
    .catch(err=>{
      reject(err);
    });
  } )
}

async function getAllByUserId(userId){
  return  Cart.findAll({
    where:{
       UserId: userId,
    },
    include:[Product]
  });
}

function deleteItem(itemId){
  return new Promise((resolve, reject)=>{
    Cart.destroy({
      where: { id: itemId },
    })
      .then((deletedRows) => {
        if (deletedRows > 0) {
          resolve(true);
        }
        else{
          reject('Item not exist');
        }
      })
      .catch((error) => {
        reject(error);
      });
  })
}
module.exports = {
  addToCart,
  getAllByUserId,
  updateQuantity,
  deleteItem
}