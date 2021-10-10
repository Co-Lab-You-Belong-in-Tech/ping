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
const {
    text
} = require('express');


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

//Description: proxy for Still Tasty (Shelf-Life) search API endpoint
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

//Description: proxy for Still Tasty (Shelf-Life) guides API endpoint 
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

//Description: proxy for Spoonacular recipe search API endpoint
//Parameters: ingredients (varchar(255)), number (int)
app.get('/getRecipes', (req, res) => {
    var ingredients = req.query.ingredients;
    console.log(ingredients);
    var ranking = 1;
    var number = req.query.number;
    request({
            url: 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=' + ingredients + "&ranking=" + ranking + "&number=" + number + "&apiKey=" + process.env.API_KEY
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

//Description: proxy for Spoonacular recipe information API endpoint
//parameters: query_id (int)
app.get('/getRecipeInfo', (req, res) => {
    var query_id = req.query.query_id;
    request({
            url: 'https://api.spoonacular.com/recipes/'+ query_id + '/information' + "?apiKey=" + process.env.API_KEY
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
//Parameters: email (varchar(255))
app.get('/getUser', async (req, res) => {
    try {
        await pool.query('SELECT * FROM users WHERE email=$1', [req.query.email],
            function (err, result, fields, rowCount) {
                console.log(result);
                console.log(result.rows);
                let string = JSON.stringify(result.rows);
                res.send(string);
            }
        );
    } catch (err) {
        console.error(err);
        res.send("Error. " + err);
    }
});

//Description: get all the distinct items across all inventory
//Parameters: user_id (int)
app.get('/getGroceries', async (req, res) => { //TO DO: add validation that user_id exists
    try {
        await pool.query('SELECT * FROM groceries WHERE user_id=$1 ORDER BY grocery_item_name ASC', [req.query.user_id],
            function (err, result, fields, rowCount) {
                console.log(result);
                let string = JSON.stringify(result.rows);
                res.send(string);
            });
    } catch (err) {
        console.error(err);
        res.send("Error. " + err);
    }
});

//Description: get a user's inventory
//Parameters: user_id (int)
app.get('/getInventory', async (req, res) => { //TO DO: add validation that user_id exists
    try {
        await pool.query('SELECT * FROM inventory WHERE user_id=$1 ORDER BY expiry_date ASC', [req.query.user_id],
            function (err, result, fields, rowCount) {
                console.log(result);
                let string = JSON.stringify(result.rows);
                res.send(string);
            });
    } catch (err) {
        console.error(err);
        res.send("Error. " + err);
    }
});

//Description: create a new user
//Parameters: email (varchar(255))
app.post('/addUser', async (req, res, next) => {
    try {
        console.log(req.query.email);
        await pool.query('SELECT * FROM users WHERE email=$1', [req.query.email], function (errs, results) {
            console.log(results);
            if (results.rowCount === 0) {
                pool.query('INSERT INTO users (email) VALUES ($1)', [req.query.email], function (err, result) {
                    let result_string = JSON.stringify(result);
                    let err_string = JSON.stringify(err);
                    console.log(result);
                    console.log(err_string);
                    if (!err) {
                        res.send('Success.');
                    } else {
                        res.send('Error.' + err.detail);
                    }
                });
            } else {
                let string = "User already exists."
                console.log(string);
                res.send(string);
            }
        });
    } catch (err) {
        console.error(err);
        res.send("Error. " + err);
    }
});

//Description: add an item to a user's grocery list
//Parameters: item_name (varchar(255)) not null, user_id (int)
app.post('/addGroceryItem', async (req, res, next) => {
    try {
        console.log(req.query);
        await pool.query('SELECT * FROM users WHERE user_id=$1', [req.query.user_id], function (errs, results) {
            console.log(results);
            if (results.rowCount > 0) {
                pool.query('INSERT INTO groceries (grocery_item_name, user_id) VALUES ($1, $2)',
                    //default tag is 'not bought' (tag is enum('not bought', 'bought'))
                    [req.query.item_name, req.query.user_id],
                    function (err, result) {
                        let result_string = JSON.stringify(result);
                        let err_string = JSON.stringify(err);
                        console.log(result);
                        console.log(err_string);
                        if (!err) {
                            res.send('Success.');
                        } else {
                            res.send('Error. ' + err.detail);
                        }
                    }
                );
            } else {
                let string = "User does not exist."
                console.log(string);
                res.send(string);
            }
        });

    } catch (err) {
        console.error(err);
        res.send("Error. " + err);
    }
});

//Description: add an item to a user's inventory
//Parameters: item_name (varchar(255)) not null, user_id (int), expiry_time (int), query_id (int)
app.post('/addInventoryItem', async (req, res, next) => {
    try {
        await pool.query('SELECT * FROM users WHERE user_id=$1', [req.query.user_id], function (errs, results) {
            if (results.rowCount > 0) {
                console.log(req.query);
                var expiry_time = convertDate(req.query.expiry_time); //converts expiry_time in seconds to days (rounded)
                var input_date = new Date();
                var expiry_date = addDate(input_date, expiry_time); //calculates the expiry_date by adding the expiry_time to input_date
                //console.log(expiry_date);
                pool.query('INSERT INTO inventory (inventory_item_name, user_id, input_date, expiry_date, query_id) VALUES ($1, $2, $3, $4, $5)',
                    //default tag is 'not expired' (tag is enum('not expired', 'expired', 'used'))
                    [req.query.item_name, req.query.user_id, input_date, expiry_date, req.query.query_id],
                    function (err, result) {
                        let result_string = JSON.stringify(result);
                        let err_string = JSON.stringify(err);
                        console.log(result);
                        console.log(err_string);
                        if (!err) {
                            res.send('Success.');
                        } else {
                            res.send('Error. ' + err.detail);
                        }
                    }
                );
            } else {
                let string = "User does not exist."
                console.log(string);
                res.send(string);
            }
        });
    } catch (err) {
        console.error(err);
        res.send("Error. " + err);
    }
});

//Description: edit the item's tag in the groceries table
//Parameters: tag (enum), user_id (int), item_id (int)
app.put('/editGroceryTag', async (req, res, next) => {
    try {
        await pool.query('SELECT * FROM groceries WHERE user_id=$1 AND grocery_item_id=$2', [req.query.user_id, req.query.item_id], async function (errs, results) {
            console.log(results);
            if (results.rowCount > 0) {
                const enum_tags = ['bought', 'not bought'];
                if (enum_tags.includes(req.query.tag)) {
                    await pool.query('UPDATE grocery SET grocery_tag = $1 WHERE user_id = $2 AND grocery_item_id = $3', [req.query.tag, req.query.user_id, req.query.item_id], function (err, result) {
                        if (result) {
                            res.send('Success.')
                        } else {
                            res.send('Error. ' + err.detail);
                        }
                    });
                } else {
                    let string = "Tag is not valid.";
                    res.send(string);
                }
            } else {
                let string = "User and/or item does not exist."
                console.log(string);
                res.send(string);
            }
        });
    } catch (err) {
        console.error(err);
        res.send("Error. " + err);
    }
});

//Description: edit the item's tag in the inventory table
//Parameters: tag (enum), user_id (int), item_id (int)
app.put('/editInventoryTag', async (req, res, next) => {
    try {
        await pool.query('SELECT * FROM inventory WHERE user_id=$1 AND inventory_item_id=$2', [req.query.user_id, req.query.item_id], async function (errs, results) {
            console.log(results);
            if (results.rowCount > 0) {
                const enum_tags = ['expired', 'not expired', 'used'];
                if (enum_tags.includes(req.query.tag)) {
                    await pool.query('UPDATE inventory SET inventory_tag = $1 WHERE user_id = $2 AND inventory_item_id = $3', [req.query.tag, req.query.user_id, req.query.item_id], function (err, result) {
                        if (result) {
                            res.send('Success.')
                        } else {
                            res.send('Error. ' + err.detail);
                        }
                    });
                } else {
                    let string = "Tag is not valid.";
                    res.send(string);
                }
            } else {
                let string = "User and/or item does not exist."
                console.log(string);
                res.send(string);
            }
        });
    } catch (err) {
        console.error(err);
        res.send("Error. " + err);
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

//Description update grocery_tag to given tag parameter
const updateGroceryTag = async (tag, user_id, item_id) => {
    return await pool.query('UPDATE groceries SET grocery_tag = $1 WHERE user_id = $2 AND grocery_item_id = $3', [tag, user_id, item_id], function (err, result) {
        let string = JSON.stringify(result);
        console.log(result);
        var text = 'Loading.';
        if (!err) {
            var text = 'Success.';
        } else {
            var text = 'Error. ' + err.detail;
        }
        console.log(text);
        return text;
    });
}

//Description: update inventory_tag to given tag parameter
const updateInventoryTag = async (tag, user_id, item_id) => {
    return await pool.query('UPDATE inventory SET inventory_tag = $1 WHERE user_id = $2 AND inventory_item_id = $3', [tag, user_id, item_id],
        function (err, result) {
            let string = JSON.stringify(result);
            console.log(result);
            var text = 'Loading.';
            if (!err) {
                var text = 'Success.';
            } else {
                var text = 'Error. ' + err.detail;
            }
            console.log(text);
            return text;
        }
    );
}

//Description: get array of item_id key-value pairs
const getInventoryIDs = async () => {
    await pool.query('SELECT DISTINCT inventory_item_id FROM inventory ORDER BY inventory_item_id ASC', function (err, result) {
        var records = result.rows;
        return records;
    });
}

//Description: schedule a check to update the tag to expired if the expiry date is passed
var expiryCheck = async () => {
    console.log("Test scheduler.");
    await pool.query('SELECT * FROM inventory', function (err, result) {
        var records = result.rows;
        records.forEach((row) => {
            var item_id = row.inventory_item_id;
            var user_id = row.user_id;
            var expiry_date = row.expiry_date;
            var today_date = new Date();
            var current_tag = row.inventory_tag;
            if (today_date >= expiry_date && current_tag === 'not expired') { //update tag to expired if expiry date has passed and item is not completely used
                var tag = 'expired';
                updateInventoryTag(tag, user_id, item_id);
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
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(404).send("Page not found.");
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("An error has occurred.");
})

/*Port*/
let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}
app.listen(port);

app.listen(app.get('port'), function () {
    console.log('Express started. Press Ctrl-C to terminate.');
});