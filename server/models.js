const { db } = require('./config');
const { DataTypes } = require('sequelize');


const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email:{
    type: DataTypes.STRING
  },
  password:{
    type: DataTypes.STRING
  }
});

const Product = db.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price:{
    type: DataTypes.FLOAT,
    allowNull: false
  },
  image:{
    type: DataTypes.STRING
  }
});

const Cart = db.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});
User.hasMany(Cart);
// Cart.belongsTo(User);
// Product.hasMany(Cart);
Cart.belongsTo(Product);

const initTables = () => db.sync({ force: true });

module.exports={
  User,
  Product,
  Cart,
  initTables
};
