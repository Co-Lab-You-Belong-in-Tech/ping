/*Setup*/
var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({
    defaultLayout: 'other'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

/*Database*/
const {
    Client
  } = require('pg');

const pool = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
pool.connect();

/*Routes*/
app.get('/', function(req, res) {
    res.send("Test");
});

app.get('/getUser', function(req, res) {
    res.send("Get User");
});

app.get('/getItems', function(req, res) {
    res.send("Get Items");
});

app.post('/addItem', function(req, res){
    res.send("Add Items");
});

app.post('/editItem', function(req, res, next) {
    res.send("Edit Item");
});

/*Utils*/


/*Error Handling*/


/*Port*/
let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}
app.listen(port);

app.listen(app.get('port'), function () {
    console.log('Express started. Press Ctrl-C to terminate.');
});