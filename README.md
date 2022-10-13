# 3813ICT Assignment

## Login
Login details for an example User (superadmin role)
Username: Zach
Password: 123

## Git
My name is Zachery Ladisla and this is my github repository for 3813ICT Assignment where we are tasked with developing a chat system. Github offers the ability to recover versions of the project for cases of malfunctions or file corruptions or even if a user would just like to revert back to an older version of the project. In order to take advantage of the features of GitHub, it is necessary for commits to be done regularly throughout the development of the project with messages that relate to the changes done to the project. This is done by initialising git on a local repository, linking it to the remote repository on GitHub, making changes, committing the changes, and pushing the version of the local repository to the remote repository. 

## Data
The data relevant for this project are the list of users and groups/channels. This data is stored inside a json file within the server folder as it allows the API to easily send data to the front-end. In the list of users, each user has a username, email, and role. While the list of groups, each group has a groupname and a list of channels.
The data used throughout this project is stored within a MongoDB database. The data structures that exist are: Users & Groups. Throughout this project, routes requests (using get and post) were used to either fetch or manipulate certain parts of data from the database. This data is stored so that it may eventually be displayed on the front-end of the application. 

### Users
The "users" data is what represents a user in the web app. Users have a Username, Password, Email, Role, and their List of Groups.
Below is an example of a record of 'users' data in the database.

### Groups
The 'groups' data represents the possible groups and channels that a user can be a part of. A record in 'groups' will have a Name, a list of Channels, and a list of Group Assistants.
Below is an example of a record of 'groups' data in the database.

## REST API
The REST API requires multiple npm packages for it to fully communicate with the front-end. Express is a web framework made for node, the CORS (Cross-Origin Resource Sharing) package is a middleware that allows a server to call/restrict resources where a HTTP request was initiated. There a series of routes that utilises the existing data as well as user input to provide features on the web app. This is done through routes. 

| Route | Parameters | Return Value | What it does |
| ----- | -----------| -------------| -------------|
| /api/login | InputUsername, Input Password | Returns an object of user information with a variable 'valid' symboling whether the user is a valid user or not. | This route matches the user input username and password on the front-end with existing user data. This allows users to access the rest of the features if they have an account (input correct username and password) |
| /api/addUsers | InputUsername, InputPassword, InputEmail, InputRole | Boolean | This route requests the InputUsername, InputPassword, InputEmail and InputRole from the front-end and inserts the requested data into the Mongo database if it doesn't already exist. |
| /api/deleteUsers | InputUsername | Boolean | This route takes the InputUsername from the front-end and looks through Mongo database until it finds a matching username and deletes it. |
| /api/getUsers | N/A | Array of Users  | This route searches the Mongo database for a 'users' collection and returns all users found within the collection. |
| /api/addGroupsUsers | GroupName, GroupUsername | The added data  | This route is created to add users to a group. It takes the username of the user and the name of the group they would like to add the user to. |
| /api/deleteUsersChannels | Username, GroupName, ChannelName | Copy of data  | This route is for removing users from a channel that they are a part of. The user must first be selected, then the name of the group that they are a part of, then the name of the channel they would like to remove the user from. |
| /api/deleteUsersGroups | Username, GroupName | Copy of Data  | This route takes the input Username to search the database for a matching record then removes the list of groups from the corresponding record. |
| /api/getGroups | N/A | Array of Groups  | This route searches the Mongo database for a 'groups' collection and returns all groups found within the collection. |
| /api/deleteGroups | GroupName | Copy of Data  | This route searches through the 'groups' collection in the Mongo database and removes all groups that match the input parameter. |
| /api/addGroups | GroupName | The added group  | This route takes the input GroupName to search the 'groups' collection in the Mongo database to check if it exists. If it doesn't this route will take the input GroupName and add it to the database. |
| /api/addChannels | ChannelName, GroupName | The added channel  | This route will request a GroupName input to know which group the user would like to add a channel to. Then a ChannelName is required so that the new channel can be given a name in the database. The new channel will then be added to the database. |
| /api/addUsersChannels | ChannelName, GroupName, Username | The added data  | This route is used to add a user to a channel. The GroupName is first required to know which set of channels to look for, then the specific ChannelName is required, then the Username of the user is required. |
| /api/deleteChannels | ChannelName, GroupName | Copy of data  | This route is used to search the Mongo database for a matching ChannelName and GroupName so that it can be removed. |



## Angular Architecture 
The Angular front-end consists of components and services. 4 components were created (login, settings, chat, and account) to organise the views and data of the app. The components hold the html for the views as well as the typescript files to represent the data beign requested from the back-end. Linked to the components is the services (sockets and login) in which they hold the functions that uses http requests necessary for the front-end and the back-end to work together. Functions held within services allows for easy accessibility and organisation. The Angular front-end is connected to the back-end via routes which allow the front-end to display certain data stored within the database. 

### Link to GitHub Repository
https://github.com/zonchh/chatsystem