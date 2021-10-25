/*Setup*/
var express = require('express');
var app = express();
var request = require('request');
var dotenv = require('dotenv').config();
var schedule = require('node-schedule');
var validator = require('validator');

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
                var error_res = JSON.parse(body);
                console.log(error_res.message);
                res.json(JSON.parse(body));
                /*return res.status(500).json({
                    type: 'error',
                    message: error_res.message
                });*/
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
            url: 'https://api.spoonacular.com/recipes/' + query_id + '/information' + "?apiKey=" + process.env.API_KEY
        },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                var error_res = JSON.parse(body);
                console.log(error_res.message);
                res.json(JSON.parse(body));
                /*return res.status(500).json({
                    type: 'error',
                    message: error_res.message
                });*/
            }
            res.json(JSON.parse(body));
        }
    )
});

//Description: get a user (determine if the user_id is present in the users table)
//Parameters: email (varchar(255))
app.get('/getUser', async (req, res) => {
    try {
        var user = await getUser(req.query.email);
        console.log(user);
        res.send(user);
    } catch (err) {
        console.error(err);
        res.send("Error. " + err);
    }
});

//Description: get all the distinct items across all inventory
//Parameters: user_id (int)
app.get('/getGroceries', async (req, res) => {
    try {
        console.log(req.query.user_id);
        if (validator.isNumeric(req.query.user_id)) {
            var result = await getUserGroceries(req.query.user_id);
            res.send(JSON.stringify(result));
        } else {
            let string = 'Invalid user.';
            console.log(string);
            res.send(string);
        }
    } catch (err) {
        console.error(err);
        res.send("Error. " + err);
    }
});

//Description: get a user's inventory
//Parameters: user_id (int)
app.get('/getInventory', async (req, res) => {
    try {
        console.log(req.query.user_id);
        if (validator.isNumeric(req.query.user_id)) {
            var result = await getUserInventory(req.query.user_id);
            res.send(JSON.stringify(result));
        } else {
            let string = 'Invalid user.';
            console.log(string);
            res.send(string);
        }
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
        var test = await getUser(req.query.email);
        if (test.length === 0) {
            var result = await addUser(req.query.email);
            res.send(result);
        } else {
            let string = "User already exists."
            console.log(string);
            res.send(string);
        }
    } catch (err) {
        console.error(err);
        res.send("Error. " + err);
    }
});

//Description: add an item to a user's grocery list
//Parameters: item_name (varchar(255)) not null, user_id (int), query_id (int)
app.post('/addGroceryItem', async (req, res, next) => {
    try {
        console.log(req.query);
        if (checkFalse(req.query.user_id) || checkFalse(req.query.item_name) || checkFalse(req.query.query_id)) {
            res.send("Missing input.");
            return;
        }
        var test = await getUser(req.query.user_id);
        console.log(test);
        if (test.length > 0) {
            //default grocery_tag is 'not bought' (tag is enum('not bought', 'bought'))
            //default display_tag is 'not deleted' (tag is enum ('not deleted', 'deleted'))
            var result = await addGroceryItem(req.query.item_name, req.query.user_id, req.query.query_id);
            res.send(result);
        } else {
            let string = "User does not exist."
            console.log(string);
            res.send(string);
        }
    } catch (err) {
        console.error(err);
        res.send("Error. " + err);
    }
});

//Description: add an item to a user's inventory
//Parameters: item_name (varchar(255)) not null, user_id (int), expiry_time (int), query_id (int)
app.post('/addInventoryItem', async (req, res, next) => {
    try {
        console.log(req.query);
        if (checkFalse(req.query.user_id) || checkFalse(req.query.item_name) || checkFalse(req.query.expiry_time) || checkFalse(req.query.query_id)) {
            res.send("Missing input.");
            return;
        }
        var test = await getUser(req.query.user_id);
        if (test.length > 0) {
            var expiry_time = await convertExpiry(req.query.expiry_time); //converts expiry_time in seconds to days (rounded)
            var input_date = new Date();
            var expiry_date = await addExpiry(input_date, expiry_time); //calculates the expiry_date
            //default usage_tag is null (tag is enum('tossed', 'used'))
            //default inventory_tag is 'not expired' (tag is enum('expired', 'not expired'))
            var result = await addInventoryItem(req.query.item_name, req.query.user_id, input_date, expiry_date, req.query.query_id, req.query.grocery_item_id);
            res.send(result);
        } else {
            let string = "User does not exist."
            console.log(string);
            res.send(string);
        }
    } catch (err) {
        console.error(err);
        res.send("Error. " + err);
    }
});

//Description: edit the display tag in the groceries table to either deleted or not deleted
//Parameters: tag (enum), user_id (int), item_id (int)
app.put('/editDisplayTag', async (req, res, next) => {
    try {
        if (checkFalse(req.query.user_id) || checkFalse(req.query.item_id) || checkFalse(req.query.tag)) {
            res.send("Missing input.");
            return;
        }
        var item_id_arr = req.query.item_id.split(",");
        var test = await getGroceryItem(req.query.user_id, item_id_arr);
        if (test.length > 0) {
            const enum_tags = ['deleted', 'not deleted'];
            if (enum_tags.includes(req.query.tag)) {
                var result = await updateDisplayTag(req.query.tag, req.query.user_id, item_id_arr);
                res.send(result);
            } else {
                let string = "Tag is not valid.";
                res.send(string);
            }
        } else {
            let string = "User and/or item does not exist."
            console.log(string);
            res.send(string);
        }
    } catch (err) {
        console.error(err);
        res.send("Error. " + err);
    }
});

//Description: edit the item's tag in the groceries table to either bought or not bought
//Parameters: tag (enum), user_id (int), item_id (int)
app.put('/editGroceryTag', async (req, res, next) => {
    try {
        if (checkFalse(req.query.user_id) || checkFalse(req.query.item_id) || checkFalse(req.query.tag)) {
            res.send("Missing input.");
            return;
        }
        var item_id_arr = req.query.item_id.split(",");
        var test = await getGroceryItem(req.query.user_id, item_id_arr);
        if (test.length > 0) {
            const enum_tags = ['bought', 'not bought'];
            if (enum_tags.includes(req.query.tag)) {
                var result = await updateGroceryTag(req.query.tag, req.query.user_id, item_id_arr);
                if (result === "Success.") {
                    if (req.query.tag === 'bought') {
                        autoAddItem(req.query.user_id, req.query.item_id);
                    } else {
                        autoDeleteItem(req.query.user_id, req.query.item_id);
                    }
                    res.send('Success.');
                } else {
                    res.send('Error. ' + err);
                }
            } else {
                let string = "Tag is not valid.";
                res.send(string);
            }
        } else {
            let string = "User and/or item does not exist."
            console.log(string);
            res.send(string);
        }
    } catch (err) {
        console.error(err);
        res.send("Error. " + err);
    }
});

//Description: edit the usage tag in the inventory table to either tossed or used
//Parameters: tag (enum), user_id (int), item_id (int)
app.put('/editUsageTag', async (req, res, next) => {
    try {
        if (checkFalse(req.query.user_id) || checkFalse(req.query.item_id) || checkFalse(req.query.tag)) {
            res.send("Missing input.");
            return;
        }
        var item_id_arr = req.query.item_id.split(",");
        var test = await getInventoryItem(req.query.user_id, item_id_arr);
        if (test.length > 0) {
            const enum_tags = ['tossed', 'used'];
            if (enum_tags.includes(req.query.tag)) {
                var result = await updateUsageTag(req.query.tag, req.query.user_id, item_id_arr);
                res.send(result);
            } else {
                let string = "Tag is not valid.";
                res.send(string);
            }
        } else {
            let string = "User and/or item does not exist."
            console.log(string);
            res.send(string);
        }
    } catch (err) {
        console.error(err);
        res.send("Error. " + err);
    }
});

//Description: edit the item's tag in the inventory table to either expired or not expired
//Parameters: tag (enum), user_id (int), item_id (int)
app.put('/editInventoryTag', async (req, res, next) => {
    try {
        if (checkFalse(req.query.user_id) || checkFalse(req.query.item_id) || checkFalse(req.query.tag)) {
            res.send("Missing input.");
            return;
        }
        var item_id_arr = req.query.item_id.split(",");
        var test = await getInventoryItem(req.query.user_id, item_id_arr);
        if (test.length > 0) {
            const enum_tags = ['expired', 'not expired'];
            if (enum_tags.includes(req.query.tag)) {
                var result = await updateInventoryTag(req.query.tag, req.query.user_id, item_id_arr);
                res.send(result);
            } else {
                let string = "Tag is not valid.";
                res.send(string);
            }
        } else {
            let string = "User and/or item does not exist."
            console.log(string);
            res.send(string);
        }
    } catch (err) {
        console.error(err);
        res.send("Error. " + err);
    }
});

/*Utils*/
//Description: check for falsey inputs
const checkFalse = (input) => {
    var test = (!input || input === null || input.length === 0 || input === "");
    //console.log(test);
    return test;
}

//Description: get grocery item record
const getGroceryItem = async (user_id, item_id) => {
    return new Promise(resolve => {
        pool.query('SELECT * FROM groceries WHERE user_id = $1 AND grocery_item_id = ANY($2)', [user_id, item_id],
        function (err, result, fields, rowCount) {
            console.log(result);
            let string = result.rows;
            resolve(string);
        });
    });
}

//Description: get inventory item record
const getInventoryItem = async (user_id, item_id) => {
    return new Promise(resolve => {
        pool.query('SELECT * FROM inventory WHERE user_id = $1 AND inventory_item_id = ANY($2)', [user_id, item_id],
        function (err, result, fields, rowCount) {
            console.log(result);
            let string = result.rows;
            resolve(string);
        });
    });
}

//Description: get the user's grocery list
const getUserGroceries = async (user_id) => {
    return new Promise(resolve => {
        pool.query('SELECT * FROM groceries WHERE user_id = $1', [user_id], function (err, result, fields, rowCount) {
            console.log(result);
            let string = result.rows;
            resolve(string);
        });
    });
}

//Description: get the user's inventory
const getUserInventory = async (user_id) => {
    return new Promise(resolve => {
        pool.query('SELECT * FROM inventory WHERE user_id = $1', [user_id], function (err, result, fields, rowCount) {
            console.log(result);
            let string = result.rows;
            resolve(string);
        });
    });
}

//Description: get user record based on user_id input (to check that user exists)
const getUser = async (user_input) => {
    try {
        return new Promise(resolve => {
            if (validator.isEmail(user_input)) {
                pool.query('SELECT * FROM users WHERE email = $1', [user_input], function (err, result) {
                    console.log(result);
                    var string = result.rows;
                    resolve(string);
                });
            } else if (validator.isNumeric(user_input)) {
                pool.query('SELECT * FROM users WHERE user_id = $1', [user_input], function (err, result) {
                    console.log(result);
                    var string = result.rows;
                    resolve(string)
                });
            } else {
                resolve([]);
            }
        });
    } catch (err) {
        console.error(err);
        return "Error: " + err;
    }
}

//Description: get shelf life from StillTasty API
const getShelfLife = (query_id) => {
    return new Promise(resolve => {
        request({
                url: 'https://shelf-life-api.herokuapp.com/guides/' + query_id.toString()
            },
            (error, response, body) => {
                if (error || response.statusCode !== 200) {
                    console.log('Error. ' + error);
                    return 'Error.';
                }
                var string = JSON.parse(body);
                var shelf_life = string.methods[0].expirationTime;
                resolve(shelf_life);
            }
        )
    });
}

//Description: get item's query_id from groceries table
const getQueryId = (user_id, item_id) => {
    return new Promise(resolve => {
        pool.query('SELECT * FROM groceries WHERE user_id = $1 AND grocery_item_id = $2', [user_id, item_id], function (err, result) {
            var query_id = result.rows[0].query_id;
            resolve(query_id);
        });
    });
}

//Description: add a new user
const addUser = (email) => {
    return new Promise(resolve => {
        pool.query('INSERT INTO users (email) VALUES ($1)', [email], function (err, result) {
            if (!err) {
                var user = getUser(email);
                resolve(user);
            } else {
                resolve('Error.' + err);
            }
        });
    });
}

//Description: auto add item to inventory if grocery_tag set to 'bought' aka checked item
const autoAddItem = async (user_id, item_id) => {
    const query_id = await getQueryId(user_id, item_id);
    const shelf_life = await getShelfLife(query_id);
    const shelf_life_converted = await convertExpiry(shelf_life);
    var input_date = await new Date();
    const expiry_date = await addExpiry(input_date, shelf_life_converted);
    var item_name = await getItemName(user_id, item_id);
    var result = await addInventoryItem(item_name, user_id, input_date, expiry_date, query_id, item_id);
    console.log(result);
}

//Description: auto remove item from inventory if grocery_tag set to 'not bought' aka unchecked item
const autoDeleteItem = async (user_id, item_id) => {
    var result = await deleteInventoryItem(user_id, item_id);
    console.log(result);
}

//Description: retrieve item_name for selected item record
const getItemName = (user_id, item_id) => {
    return new Promise(resolve => {
        pool.query('SELECT * FROM groceries WHERE user_id = $1 AND grocery_item_id = $2', [user_id, item_id], function (err, result) {
            var item_name = result.rows[0].grocery_item_name;
            resolve(item_name);
        });
    });
}

//Description: insert a new record into groceries table
const addGroceryItem = (item_name, user_id, query_id) => {
    return new Promise(resolve => {
        //default grocery_tag is 'not bought' (tag is enum('not bought', 'bought'))
        //default display_tag is 'not deleted' (tag is enum ('not deleted', 'deleted'))
        pool.query('INSERT INTO groceries (grocery_item_name, user_id, query_id) VALUES ($1, $2, $3)',
        [item_name, user_id, query_id], function (err, result) {
            if (result) {
                console.log(result);
                resolve('Success.');
            } else {
                resolve('Error. ' + err);
            }
        });
    });
}

//Description: insert a new record into inventory table
const addInventoryItem = (item_name, user_id, input_date, expiry_date, query_id, item_id) => {
    return new Promise(resolve => {
        //default usage_tag is null (tag is enum('tossed', 'used'))
        //default inventory_tag is 'not expired' (tag is enum('expired', 'not expired'))
        pool.query('INSERT INTO inventory (inventory_item_name, user_id, input_date, expiry_date, query_id, grocery_item_id) VALUES ($1, $2, $3, $4, $5, $6)', [item_name, user_id, input_date, expiry_date, query_id, item_id], function (err, result) {
            if (result) {
                console.log(result);
                resolve('Success.');
            } else {
                resolve('Error. ' + err);
            }
        });
    });
}

//Description: delete a record from inventory table
const deleteInventoryItem = (user_id, item_id) => {
    return new Promise(resolve => {
        pool.query('DELETE FROM inventory WHERE user_id = $1 AND grocery_item_id = $2', [user_id, item_id], function (err, result) {
            console.log(result);
            resolve(result);
        });
    });
}

//Description: convert the time in seconds to days (Promise)
const convertExpiry = (expiry_time) => {
    return new Promise(resolve => {
        var shelf_life = Math.round(expiry_time / (60 * 60 * 24));
        resolve(shelf_life);
    });
}

//Description: adds the shelf life to the input date to calculate the expiry date (Promise)
const addExpiry = (input_date, expiry_time) => {
    return new Promise(resolve => {
        const current_date = new Date(input_date);
        const new_date = current_date.setDate(current_date.getDate() + expiry_time);
        const expiry_date = new Date(new_date);
        const expiry_date_formatted = expiry_date.toISOString().split('T')[0]; //retains the date portion of datetime
        //console.log("Expiry Date: " + expiry_date_formatted);
        resolve(expiry_date_formatted);
    });
}

//Description: update display_tag to given tag parameter
const updateDisplayTag = async (tag, user_id, item_id) => {
    return new Promise(resolve => {
        pool.query('UPDATE groceries SET display_tag = $1 WHERE user_id = $2 AND grocery_item_id = ANY($3)', [tag, user_id, item_id], function (err, result) {
            let string = JSON.stringify(result);
            if (!err) {
                resolve('Success.');
            } else {
                resolve('Error. ' + err);
            }
        });
    });
}

//Description: update grocery_tag to given tag parameter
const updateGroceryTag = async (tag, user_id, item_id) => {
    return new Promise(resolve => {
        pool.query('UPDATE groceries SET grocery_tag = $1 WHERE user_id = $2 AND grocery_item_id = ANY($3)', [tag, user_id, item_id], function (err, result) {
            let string = JSON.stringify(result);
            if (!err) {
                resolve('Success.');
            } else {
                resolve('Error. ' + err);
            }
        });
    });
}

//Description: update usage_tag to given tag parameter
const updateUsageTag = async (tag, user_id, item_id) => {
    return new Promise(resolve => {
        pool.query('UPDATE inventory SET usage_tag = $1 WHERE user_id = $2 AND inventory_item_id = ANY($3)', [tag, user_id, item_id], function (err, result) {
            let string = JSON.stringify(result);
            if (!err) {
                resolve('Success.');
            } else {
                resolve('Error. ' + err);
            }
        });
    });
}

//Description: update inventory_tag to given tag parameter
const updateInventoryTag = async (tag, user_id, item_id) => {
    return new Promise(resolve => {
        pool.query('UPDATE inventory SET inventory_tag = $1 WHERE user_id = $2 AND inventory_item_id = ANY($3)', [tag, user_id, item_id], function (err, result) {
            let string = JSON.stringify(result);
            if (!err) {
                resolve('Success.');
            } else {
                resolve('Error. ' + err);
            }
        });
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
            if (today_date >= expiry_date && current_tag === 'not expired') { //update tag to expired if expiry date has passed 
                var tag = 'expired';
                updateInventoryTag(tag, user_id, item_id);
            }
        });
    });
};

var rule = new schedule.RecurrenceRule();
rule.hour = 0; //runs once a day at midnight
//rule.minute = new schedule.Range(0, 59, 1);

//Description: CRON scheduler that runs the expiryCheck function based on the provide schedule rule
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