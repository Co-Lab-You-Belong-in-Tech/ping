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

app.get('/getUser', async (req, res) => {
    try {
        await pool.query('SELECT * FROM users WHERE user_id=$1', [req.query.user_id], 
            function (err, result, fields, rowCount) {
                console.log(result);
                console.log(result.rows);
                let string = JSON.stringify(result.rows);
                res.send(string);
            }
        );
    } catch (err) {
        console.error(err);
        res.send("Error: " + err);
    }
});

app.get('/getList', async (req, res) => {
    try {
        await pool.query('SELECT * FROM items', function (err, result, fields, rowCount) {
            console.log(result);
            let string = JSON.stringify(result.rows);
            res.send(string);
        });
    } catch (err) {
        console.error(err);
        res.send("Error: " + err);
    }
});

app.get('/getInventory', async (req, res) => {
    try {
        await pool.query('SELECT inv.*, itm.item_name FROM inventory inv LEFT JOIN items itm ON inv.item_id = itm.item_id WHERE user_id=$1', 
            [req.query.user_id], function (err, result, fields, rowCount) {
            console.log(result);
            let string = JSON.stringify(result.rows);
            res.send(string);
        });
    } catch (err) {
        console.error(err);
        res.send("Error: " + err);
    }
});

app.post('/addItem', (req, res, next) => {
    var expiry_time = Math.round(req.query.expiry_time / (60*60*24)); //converts expiry_time in seconds to days (rounded)
    var expiry_date = addDate(req.query.input_date, expiry_time); //calculates the expiry_date by adding the expiry_time to input_date
    console.log(expiry_date);
    pool.query('INSERT INTO inventory (item_id, user_id, original_amount, input_date, expiry_date) VALUES ($1, $2, $3, $4, $5)',
        [req.query.item_id, req.query.user_id, req.query.original_amount, req.query.input_date],
        function (err, result) {
            let string = JSON.stringify(result);
            res.send(string);
        }
    );
    res.send("Success");
});

app.post('/editItem', (req, res, next) => {
    //res.send("Edit Item");
});

/*Utils*/
const addDate = (input_date, expiry_time) => {
    const current_date = new Date(input_date)
    const new_date = current_date.setDate(current_date.getDate() + expiry_time);
    const expiry_date = new Date(new_date);
    console.log("Expiry Date: ", expiry_date);
    return expiry_date;
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