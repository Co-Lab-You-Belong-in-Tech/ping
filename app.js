/*Setup*/
var express = require('express');
var app = express();
var request = require('request');

var handlebars = require('express-handlebars').create({
    defaultLayout: 'other'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

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
app.get('/searchItem', (req, res) => {
    var item = req.query.item;
    console.log(item);
    request(
        {url: 'https://shelf-life-api.herokuapp.com/search?q=' + item},
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message});
            }
            res.json(JSON.parse(body));
        }
    )
});

app.get('/getDetails', (req, res) => {
    var query_id = req.query.query_id;
    console.log(query_id);
    request(
        {url: 'https://shelf-life-api.herokuapp.com/guides/' + query_id},
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message});
            }
            res.json(JSON.parse(body));
        }
    )
});

app.get('/', function(req, res) {
    res.send("Test");
});

app.get('/getUser', (req, res) => {
    var context = {};
    pool.query('SELECT * FROM users WHERE user_id=$1', [req.query.user_id], function (err, rows, fields, rowCount) {
        console.log(rows);
        let string = JSON.stringify(rows);
        res.send(string);
    });
});

app.get('/getList', (req, res) => {
    pool.query('SELECT * FROM items', function (err, rows, fields, rowCount) {
        console.log(rows);
        let string = JSON.stringify(rows);
        res.send(string);
    });
});

app.get('/getInventory', (req, res) => {
    pool.query('SELECT inv.*, itm.item_name FROM inventory inv LEFT JOIN items itm ON inv.item_id = itm.item_id WHERE user_id=$1', [req.query.user_id], function (err, rows, fields, rowCount) {
        console.log(rows);
        let string = JSON.stringify(rows);
        res.send(string);
    });
});

app.post('/addItem', (req, res, next) => {
    var expiry_time = Math.round(req.query.expiry_time / (60*60*24));
    var expiry_date = addDate(req.query.input_date, expiry_time);
    /*(pool.query('INSERT INTO inventory (item_id, user_id, original_amount, input_date, expiry_date) VALUES ($1, $2, $3, $4, $5)',
        [req.query.item_id, req.query.user_id, req.query.original_amount, req.query.input_date],
        function (err, result) {
            let string = JSON.stringify(result);
            res.send(string);
        }
    );*/
    res.send("Success");
});

app.post('/editItem', (req, res, next) => {
    //res.send("Edit Item");
});

/*Utils*/
const addDate = (input_date, expiry_time) => {
    var expiry_date = input_date.getDate() + expiry_time;
    return expiry_date
}


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