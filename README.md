# KARROT

## Summary

A website that makes it easy for millennial home cooks to create a grocery list, keep track of their food inventory, remind them when food is about to go bad, and a fun way to learn more food and cooking tips.

## Technologies
- Front-end: React.js, JSX, Material-UI
- Back-end: Node.js, Express
- Database: Postgresql
- Hosting: Heroku and Surge

## Installation
1. Clone the repository
2. npm install at root level
3. cd into /public folder and npm install
4. Set .env file with DATABASE_URL from Heroku and API_KEY from Spoonacular (for local development)

## Routes
All routes accessible via https://food-ping.herokuapp.com/.
- ```/``` testing page which returns 'PING ME'
- ```/searchItem?item={}``` search for items from Still Tasty based on the item query searched
- ```/getDetails?query_id={}``` get the shelf life of an item from Still Tasty
- ```/getRecipes?ingredients={}``` get a list of recipes that match the ingredient(s) criteria from Spoonacular
- ```/getRecipeInfo?query_id={}``` get more information about a single recipe based on the query id passed as parameter from Spoonacular
- ```/getUser?email={}``` retrieve a user record based on the email parameter
- ```/getGroceries?user_id={}``` retrieve a user's grocery list
- ```/getInventory?user_id={}``` retrieve a user's fridge inventory
- ```/addUser?email={}``` add a new user with the email parameter
- ```/addGroceryItem?item_name={}&user_id={}&query_id={}``` add an item to a user's grocery list
- ```/addInventoryItem?item_name={}&user_id={}&expiry_time={}&query_id={}``` add an item to a user's fridge inventory
- ```/editGroceryTag?tag={}&user_id={}&item_id={}``` update an item's tag to 'not bought' or 'bought' in a user's grocery list
- ```/editDisplayTag?user_id={}&item_id={}&tag={}``` mimic the delete functionality on the user's grocery list by passing either 'deleted' or 'not deleted' as the tag
- ```/editInventoryTag?tag={}&user_id={}&item_id={}``` update an item's tag to 'not expired', 'expired' or 'used' in a user's fridge inventory
- ```/editUsageTag?user_id={}&item_id={}&tag={}``` update the tag to either 'tossed' or 'used' for an item in a user's inventory

## Functions
- ```expiryCheck``` a CRON scheduler to update the inventory tag to 'expired' from 'not expired' if today's date is greater than or equal to an item's expiry date; rule is currently set to check every midnight
- ```autoAddItem``` a utility function that automatically adds an item to the inventory table should an item be checked i.e. tag is updated to 'bought' in the groceries table
- ```autoDeleteItem``` a utility function that automatically deletes an item to the inventory table should an item be unchecked i.e. tag is updated to 'not bought' in the groceries table
- ```convertExpiry, addExpiry```: utility functions that receive the shelf life in seconds, converts the value to days and calculates the expiry date based on the input date

## Issues

## Contributions

## License
