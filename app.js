/*Setup*/
var express = require('express');
var app = express();
var request = require('request');
var dotenv = require('dotenv').config();
var schedule = require('node-schedule');

var handlebars = require('express-handlebars').create({
    defaultLayout: 'other'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
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
app.get('/', function (req, res) {
    res.send("PING ME.");
});

//Description: proxy for Still Tasty (Shelf-Life) API
//Parameters: item (string)
app.get('/searchItem', (req, res) => {
    var item = req.query.item;
    console.log(item);
    request({
            url: 'https://shelf-life-api.herokuapp.com/search?q=' + item
        },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({
                    type: 'error',
                    message: error.message
                });
            }
            res.json(JSON.parse(body));
        }
    )
});

//Description: proxy for Still Tasty (Shelf-Life) API 
//Parameters: query_id (int)
app.get('/getDetails', (req, res) => {
    var query_id = req.query.query_id;
    console.log(query_id);
    request({
            url: 'https://shelf-life-api.herokuapp.com/guides/' + query_id
        },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({
                    type: 'error',
                    message: error.message
                });
            }
            res.json(JSON.parse(body));
        }
    )
});

//Description: get a user (determine if the user_id is present in the users table)
//Parameters: user_id (int)
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

//Description: get all the distinct items across all inventory
//Parameters: None
app.get('/getList', async (req, res) => {
    try {
        await pool.query('SELECT DISTINCT (item_name) FROM inventory', function (err, result, fields, rowCount) {
            console.log(result);
            let string = JSON.stringify(result.rows);
            res.send(string);
        });
    } catch (err) {
        console.error(err);
        res.send("Error: " + err);
    }
});

//Description: get a user's inventory
//Parameters: user_id (int)
app.get('/getInventory', async (req, res) => {
    try {
        await pool.query('SELECT * FROM inventory WHERE user_id=$1',
            [req.query.user_id],
            function (err, result, fields, rowCount) {
                console.log(result);
                let string = JSON.stringify(result.rows);
                res.send(string);
            });
    } catch (err) {
        console.error(err);
        res.send("Error: " + err);
    }
});

//Description: create a new user
//Parameters: None
app.post('/addUser', async (req, res, next) => {
    try {
        await pool.query('INSERT INTO users VALUES (default)', function (err, result) { //auto-increments user_id
            let string = JSON.stringify(result);
            res.send(string);
        });
    } catch (err) {
        console.error(err);
        res.send("Error: " + err);
    }
});

//Description: add an item to a user's inventory
//Parameters: item_name (varchar), user_id (int), original_amount (int), input_date (date), expiry_date (date), query_id (int)
app.post('/addItem', async (req, res, next) => {
    try {
        console.log(req.query);
        var expiry_time = convertDate(req.query.expiry_time); //converts expiry_time in seconds to days (rounded)
        //console.log("Input Date: " + req.query.input_date);
        var expiry_date = addDate(req.query.input_date, expiry_time); //calculates the expiry_date by adding the expiry_time to input_date
        //console.log(expiry_date);
        var amount_used = 0; //default amount used to 0
        var tag = "not expired"; //default tag to not expired (tag is enum('not expired', 'expired', 'finished'))
        await pool.query('INSERT INTO inventory (item_name, user_id, original_amount, amount_used, input_date, expiry_date, tag, query_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [req.query.item_name, req.query.user_id, req.query.original_amount, amount_used, req.query.input_date, expiry_date, tag, req.query.query_id],
            function (err, result) {
                let string = JSON.stringify(result);
                res.send(string);
            }
        );
    } catch (err) {
        console.error(err);
        res.send("Error: " + err);
    }
});

//Description: edit the item to update the amount_used
//Parameters: amount_used (int), user_id (int), item_id (int)
app.put('/editItem', async (req, res, next) => {
    try {
        await pool.query('SELECT * FROM inventory WHERE user_id = $1 AND item_id = $3', [req.query.user_id, req.query.item_id],
            function (err, result) {
                var record = result.rows;
                var original_amount = record.original_amount;
                if (amount_used <= original_amount) { //only update if amount_used is a valid amount i.e. less than or equal to original_amount
                    pool.query('UPDATE inventory SET amount_used = $1 WHERE user_id = $2 AND item_id = $3',
                        [req.query.amount_used, req.query.user_id, req.query.item_id],
                        function (err, result) {
                            let string = JSON.stringify(result);
                            console.log(result);
                            res.send(string);
                        }
                    );
                }
            });
        await checkAmount(); //check if amount_used equals to original_amount
    } catch (err) {
        console.error(err);
        res.send("Error: " + err);
    }
});

/*Utils*/
//Description: convert the time in seconds to days
const convertDate = (expiry_time) => {
    var shelf_life = Math.round(expiry_time / (60 * 60 * 24));
    //console.log("Shelf Life: " + shelf_life);
    return shelf_life;
}

//Description: adds the shelf life to the input date to calculate the expiry date
const addDate = (input_date, expiry_time) => {
    const current_date = new Date(input_date);
    //console.log("Input Date: " + current_date);
    const new_date = current_date.setDate(current_date.getDate() + expiry_time);
    const expiry_date = new Date(new_date);
    const expiry_date_formatted = expiry_date.toISOString().split('T')[0]; //retains the date portion of datetime
    console.log("Expiry Date Formatted: " + expiry_date_formatted);
    return expiry_date_formatted;
}

//Description: check if all quantity is used, if so, update tag to finished
const checkAmount = (original_amount, amount_used, user_id, item_id) => {
    if (original_amount === amount_used) {
        var tag = 'finished';
        updateTag(tag, user_id, item_id);
    }
}

//Description: update tag to given tag parameter
const updateTag = (tag, user_id, item_id) => {
    pool.query('UPDATE inventory SET tag = $1 WHERE user_id = $2 AND item_id = $3', [tag, user_id, item_id],
        function (err, result) {
            let string = JSON.stringify(result);
            console.log(result);
        }
    );
}

//Description: get array of item_id key-value pairs
const getItemIDs = async () => {
    await pool.query('SELECT DISTINCT item_id FROM inventory ORDER BY item_id ASC', function (err, result) {
        var records = result.rows;
        //console.log(records);
        return records;
    });
}

//Description: schedule a check to update the tag to expired if the expiry date is passed
var expiryCheck = async () => {
    console.log("Test scheduler.");
    await pool.query('SELECT * FROM inventory', function (err, result) {
        var records = result.rows;
        records.forEach((row) => {
            var item_id = row.item_id;
            var user_id = row.user_id;
            var expiry_date = row.expiry_date;
            var today_date = new Date();
            var current_tag = row.tag;
            if (today_date >= expiry_date && current_tag === 'not expired') { //update tag to expired if expiry date has passed and item is not completely used
                var tag = 'expired';
                updateTag(tag, user_id, item_id);
            }
        });
    });
};

var rule = new schedule.RecurrenceRule();
rule.hour = 0; //runs once a day at midnight
//rule.minute = new schedule.Range(0, 59, 1);

const expiryCheckScheduler = schedule.scheduleJob(rule, function () { //runs function based on CRON scheduler
    console.log("Finished expiry check.");
    expiryCheck();
});

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