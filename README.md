# 3813ICT Assignment

## Git
My name is Zachery Ladisla and this is my github repository for 3813ICT Assignment where we are tasked with developing a chat system. This github project uses Angular to serve as the front end of the web app and uses Nodejs as the back-end to make a REST API. Github is used as version control as it offers the ability to keep track of progress with commits and to backtrack on previous version of the project if necessary. As Angular and Nodejs are being used together, they have been separated from each other in folders in order to easily manage either end. The Nodejs server is kept within the server folder which is found in the root of the project. 

## Data
The data relevant for this project are the list of users and groups/channels. This data is stored inside a json file within the server folder as it allows the API to easily send data to the front-end. In the list of users, each user has a username, email, and role. While the list of groups, each group has a groupname and a list of channels.

## REST API
The REST API requires multiple npm packages for it to fully communicate with the front-end. Express is a web framework made for node, the CORS (Cross-Origin Resource Sharing) package is a middleware that allows a server to call/restrict resources where a HTTP request was initiated. There a series of routes that utilises the existing data as well as user input to provide features on the web app. This is done through routes. 

| Route | Parameters | Return Value | What it does |
| ----- | -----------| -------------| -------------|
| /api/login | InputUsername, Input Password | Valid Username | This route matches the user input on the front-end with existing user data. As user authentication isn't yet necessary, this route only matches a users InputUsername with the username stored in the json file. |
| /api/addUser | InputUsername, InputEmail, InputRole | Valid entry of all parameters | This route requests the InputUsername, InputEmail and InputRole from the front-end and pushes the parameters to the list of existing users in the json file. |
| /api/deleteUser | InputUsername | Boolean | This route takes the InputUsername from the front-end and looks through the block of data from the json file until it finds a matching username and deletes it from the json file.

## Angular Architecture 
For this project, I generated 3 components which serve as the views for the web app which are login, account, and settings. They are all linked together to allow templating so that every page redirect doesn't have to render an entire new page of html. I then generated a service named login. This contains the User and Group interface as well as the HTTP methods for the routes.