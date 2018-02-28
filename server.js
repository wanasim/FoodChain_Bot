const paypal = require('paypal-rest-sdk');
const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const ejs = require('ejs');
const port = process.env.PORT || 8000;
var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'oac')));

app.set('view engine', 'ejs');

require('./server/routes.js')(app);

app.listen(port, function(){
   console.log(`listening on port ${port}`)
})
