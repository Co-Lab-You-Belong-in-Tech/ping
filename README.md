# KARROT

## Summary

A website that makes it easy for millennial home cooks to keep track of their food inventory, remind them when food is about to go bad, and a fun way to learn more food and cooking tips.

## Technologies
- Front-end: React.js, JSX, Material-UI
- Back-end: Node.js, Express
- Database: Postgresql
- Hosting: Heroku and Surge

## Installation
1. Clone the repository
2. npm install at root level
3. cd into /public folder and npm install
4. Set .env file with DATABASE_URL from Heroku (for local development)

## Routes
All routes accessible via https://food-ping.herokuapp.com/.
- ```/searchItem?item={}``` search for items from Still Tasty based on the item query searched
- ```/getDetails?query_id={}``` get the shelf life of an item from Still Tasty
- ```/getUser?email={}``` retrieve a user record based on the email parameter
- ```/getGroceries?user_id={}``` retrieve a user's grocery list
- ```/getInventory?user_id={}``` retrieve a user's fridge inventory
- ```/addUser?email={}``` add a new user with the email parameter
- ```/addGroceryItem?item_name={}&user_id={}``` add an item to a user's grocery list
- ```/addInventoryItem?item_name={}&user_id={}&expiry_time={}&query_id={}``` add an item to a user's fridge inventory
- ```/editGroceryTag?tag={}&user_id={}&item_id={}``` update an item's tag to 'not bought' or 'bought' in a user's grocery list
- ```/editInventoryTag?tag={}&user_id={}&item_id={}``` update an item's tag to 'not expired', 'expired' or 'used' in a user's fridge inventory

## Issues

## Contributions

## License
