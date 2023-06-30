const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const init = require('./server/init');
const path = require('path');

// init app db 
init();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const isProd=true;

if(!isProd){
  app.use(
    cors({
      origin: 'http://localhost:3000', 
      methods: ['GET', 'POST', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
}

if(isProd){
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

}
else{
  app.get('/', (req, res) => res.render('index', res.send('DEV')));
}

app.use('/user', require('./server/routes/user'));
app.use('/products', require('./server/routes/products'));
app.use('/cart', require('./server/routes/cart'));

const PORT = process.env.API_PORT;

app.listen(PORT, console.log(`Server started on port ${PORT}`));