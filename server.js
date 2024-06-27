let http = require("http");
let express = require("express");
let bodyParser = require("body-parser");
const path = require('path');
let dbConnection = require("./Config/connection.js");
let cors = require('cors');

let app = express();
app.use(cors());

let restaurantRoutes = require('./app/routes/restaurant.routes.js');



const port = 8000;
app.use(bodyParser.json());


// define route

app.use('/restaurant', restaurantRoutes);
app.use('/',express.static(path.join(__dirname,'public')))

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', express.static(path.join(__dirname, 'angular')));

app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
})

