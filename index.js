const express = require('express');
const bodyParser = require('body-parser');
const init = require('./server/init');
// const path = require('path');

// init app db 
init();


const app = express();

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Set static folder 
// app.use(express.static(path.join(__dirname, 'public')));

// Index route
app.get('/', (req, res) => res.render('index', res.send('Dima')));

// User routes
app.use('/user', require('./server/routes/user'));
app.use('/products', require('./server/routes/products'));
app.use('/cart', require('./server/routes/cart'));

const PORT = process.env.API_PORT;

app.listen(PORT, console.log(`Server started on port ${PORT}`));