# KARROT

![frontend](./readme_img/Karrot.png)


## Summary

A website that makes it easy for millennial home cooks to create a grocery list, keep track of their food inventory, remind them when food is about to go bad, and a fun way to learn more food and cooking tips.

## Technologies

- Front-end: React.js, JSX, React-notification
- Back-end: Node.js, Express
- Database: Postgresql
- Hosting: Heroku and Netify

## Installation Backend

1. Clone the repository
2. npm install at root level
3. cd into /public folder and npm install
4. Set .env file with DATABASE_URL from Heroku and API_KEY from Spoonacular (for local development)

## API Routes

All routes accessible via https://food-ping.herokuapp.com/.

- `/` testing page which returns 'PING ME'
- `/searchItem?item={}` search for items from Still Tasty based on the item query searched
- `/getDetails?query_id={}` get the shelf life of an item from Still Tasty
- `/getRecipes?ingredients={}` get a list of recipes that match the ingredient(s) criteria from Spoonacular
- `/getRecipeInfo?query_id={}` get more information about a single recipe based on the query id passed as parameter from Spoonacular
- `/getUser?email={}` retrieve a user record based on the email parameter
- `/getGroceries?user_id={}` retrieve a user's grocery list
- `/getInventory?user_id={}` retrieve a user's fridge inventory
- `/addUser?email={}` add a new user with the email parameter
- `/addGroceryItem?item_name={}&user_id={}&query_id={}` add an item to a user's grocery list
- `/addInventoryItem?item_name={}&user_id={}&expiry_time={}&query_id={}` add an item to a user's fridge inventory
- `/editGroceryTag?tag={}&user_id={}&item_id={}` update an item's tag to 'not bought' or 'bought' in a user's grocery list
- `/editDisplayTag?user_id={}&item_id={}&tag={}` mimic the delete functionality on the user's grocery list by passing either 'deleted' or 'not deleted' as the tag
- `/editInventoryTag?tag={}&user_id={}&item_id={}` update an item's tag to 'not expired', 'expired' or 'used' in a user's fridge inventory
- `/editUsageTag?user_id={}&item_id={}&tag={}` update the tag to either 'tossed' or 'used' for an item in a user's inventory

## Functions

- `expiryCheck` a CRON scheduler to update the inventory tag to 'expired' from 'not expired' if today's date is greater than or equal to an item's expiry date; rule is currently set to check every midnight
- `autoAddItem` a utility function that automatically adds an item to the inventory table should an item be checked i.e. tag is updated to 'bought' in the groceries table
- `autoDeleteItem` a utility function that automatically deletes an item to the inventory table should an item be unchecked i.e. tag is updated to 'not bought' in the groceries table
- `convertExpiry, addExpiry`: utility functions that receive the shelf life in seconds, converts the value to days and calculates the expiry date based on the input date

## FrontEnd Logic
![frontend](./readme_img/1.png)
- Api.js : store all api related functions.
- Naviagation: it includes bottom navigation and a navigation created for static recipe page.
- EmptyHolder: It is a default holder when page data doesnt render.
- Assets： all related photos and logo, icons.
- Notification:  all customized small size and large size notifications.
- Pages: list page is for grocery list page, and inventory is for fridge page, recipe is for recipe page. For each of the page it include a area holder, child component as singe item. 
- useContext: it store user id, expired item and functions to set them.
- login and signup: it use the reuseable form to capture the input and complete the loop.

## Features
![frontend](./readme_img/login.png)
- Users can use their email to signup and login.
If the email is incorrect, it will give the user the error message.
My Grocery List
![frontend](./readme_img/grocery.png)
- Users can search up and add multiple items to their grocery list by clicking on the “Add Item” button.
When users check items on their list, they are automatically added to their Fridge.
If they make a mistake, they can easily uncheck items.
Users can easily remove all items from their List by clicking on the “Delete All” button.

![frontend](./readme_img/fridge.png)
- Items added to the Fridge are listed by closest expiration date.
Users can select multiple items at one time and select the “Mark as Used” or “Mark as Tossed” button.
For both options “Mark as Used” and “Mark as Tossed”, a pop up will ask users to verify they want to mark as used or as tossed, or they can click on “Nevermind”.

![frontend](./readme_img/2.png)
- If there are items that are about to expire within two days, an orange dot will appear on the top right corner of the Fridge icon.
When users click on the Fridge icon with a notification, a message pops up that tells the user which ingredients are about to expire. User has two options: click “Got It!” or “Show Recipes”.


![frontend](./readme_img/recipe.png)
- Users will find three recipe suggestions based on the ingredients they have in their Fridge, and they can click on the recipe title to find more details.



## Issues

## Contributions

## License
