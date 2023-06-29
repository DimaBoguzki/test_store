const bcrypt = require('bcrypt');
const {initStrcut} = require('./config');
const { initTables, Product, User } = require('./models');


const products = [
  { 
    title: 'Car', 
    price: 10.99,
    image:'https://i1.pickpik.com/photos/484/913/137/supercar-ferrari-style-car-preview.jpg'
  },
  { 
    title: 'Bike', 
    price: 105.00,
    image:'https://m.media-amazon.com/images/I/81XyIoZ8+HL._AC_UF1000,1000_QL80_.jpg'
  },
  { 
    title: 'Bus', 
    price: 17.99,
    image:'https://cdn.britannica.com/37/123137-050-B5AA0969/trolleybus-Belgrade-Serbia.jpg'
  },
  { 
    title: 'Airplain', 
    price: 1250.00,
    image:'https://cdn.geekwire.com/wp-content/uploads/2023/01/230118-sustainable.jpg'
  },
  { 
    title: 'Train', 
    price: 945.99,
    image:'https://upload.wikimedia.org/wikipedia/commons/f/f9/CN_8015%2C_5690_and_5517_Hinton_-_Jasper.jpg'
  },
  { 
    title: 'Boat', 
    price: 999.99,
    image:'https://www.tessllc.us/wp-content/uploads/2020/07/yacht-post-825x510.jpg'
  },
];



module.exports=(async ()=>{
  try{
    await initStrcut();
    console.log('Database connected...')
  }
  catch(err){
    console.error(err);
  }
  try{
    await initTables();
    console.log('Tables created successfully!');
    await Product.bulkCreate(products)
    await User.bulkCreate([
      {
        name:'Dima Boguzki',
        password: await bcrypt.hash('1234', 10),
        email:"dima@gmail.com"
      }
    ])
  }
  catch(err){
    console.error(err);
  }
});
