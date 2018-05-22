# Pet-Store-App-SD4x-Node-Homework
This is my code for the "Pet Store API" assignment for UPenn's Programming for the Web with JavaScript.

Specifications (adapted from the SD4x platform on EdX):

Homework 6 - Node

In this assignment, you will use Node.js and Express to develop a Web API that provides services related to data stored in a MongoDB database.

This assignment continues the “pet store” theme from previous assignments. In this case, you will build a Web API that allows applications to get information about the pets at the store and the pet toys that the store sells.

In completing this assignment, you will:

- Learn how to set up Node, Express, Mongo, and related packages

- Apply what you have learned about developing a Node Express app and using various objects and functions

- Implement JavaScript queries using Mongoose to retrieve data from a MongoDB database

- Create a server-side Web application that reads data from an incoming HTTP request and sends back JSON data in an HTTP response

Getting Started

To complete this assignment, you will need to set up a development environment that uses Node, Express, Mongoose, and MongoDB. We recommend that you do this on your local computer as follows; you will likely need sudo/root access for each of these steps:

- Install Node.js locally by downloading it from https://nodejs.org/en/download/>

- From the Terminal, Command Prompt, etc. update Node Package Manager by typing the command: npm install npm –g

- Create a new folder or directory for your project, then navigate to it using Terminal, Command Prompt, etc.

- Initialize the project by typing the command: npm init

- Install Express by typing the command: npm install express --save

- Install Mongoose by typing the command: npm install mongoose --save

If you would like to install MongoDB locally, download the "Community Server" version from https://www.mongodb.com/download-center#community >and follow the instructions for installing it and running it; alternatively, you can create an account to use a cloud service such as MongoDB Atlas (https://www.mongodb.com/cloud/atlas>); either way, be sure to note the hostname and port number of where your database instance is running


The index.js file is the main file for your Node Express app. It includes the necessary packages, sets up the web server to listen on port 3000, and defines a route that sends back a simple JSON object for all HTTP requests.

To ensure that your setup works correctly, use Terminal or Command Prompt to navigate to the root directory of your Node Express project and type the command: node index.js

You should see the message “Listening on port 3000”.

Then use your web browser to access http://localhost:3000> and you should see a JSON object that reads {"msg":"It works!"} in the browser.

Animal.js and Toy.js define the schema that you will need for your Mongo database. You may modify the host/port/database configuration that is passed to mongoose.connect> for your particular environment, but do not change the Schema definitions as these will be used by the grader when you submit.


Activity

In this assignment you will implement four Web APIs using Node and Express to handle the HTTP requests and responses, and Mongoose to handle the interaction with the MongoDB database.

The specifications of the APIs are provided below. We recommend that you attempt them in the order in which they are described. Note that in all but the first instance, your code will need to construct the JSON object that is sent back in the response, as opposed to just sending back the data that comes out of MongoDB.


/findToy

Parameters:

id: >the ID of the Toy to find

Example usage: /findToy?id=1234

Description:

This API finds and returns the Toy in the “toys” collection with the ID that matches the id> parameter. It should return the entire Toy document/object, including all properties that are stored in the database.

If the id> parameter is unspecified, or if there is no Toy that has a matching ID, this API should return an empty object.


/findAnimals

Parameters:

species: >the species of the Animals to find

trait: >one of the traits of the Animals to find

gender: >the gender of the Animals to find

Example usage: /findAnimals?species=Dog&trait=loyal&gender=female

Description:

This API finds all Animals in the “animals” collection that have a species and gender that match the species> and gender> parameters, respectively, and for which one of the Animal’s traits matches the trait> parameter. All matches should be complete matches, not partial matches using regular expressions, for instance.

The return value is an array of objects representing each Animal, but the object must only> include the Animal’s name, species, breed, gender, and age.

If the species>, trait>, or gender> parameter is unspecified, it should be ignored in the search, i.e. the API should consider Animals regardless of their values for the unspecified parameter(s)

However, if the species>, trait>, and gender> parameters are all unspecified, then the API should return an empty object.

Likewise, if there are no Animals that match all of the specified parameters, the API should return an empty object.


/animalsYoungerThan

Parameters:

age: >the maximum age (exclusive) of the Animals to find

Example usage: /animalsYoungerThan?age=12

Description:

This API finds all Animals in the “animals” collection that have an age that is less than (but not equal to!) the age> parameter.

The return value is an object that has two properties:

“count”: the number of Animals whose age is less than the age> parameter.

“names”: an array containing the names of the Animals whose age is less than the age> parameter (these can be arranged in any order in the array)

If there are no Animals that have an age less than the age> parameter, then the API should return an object that has a “count” property set to 0, but no “names” property

If the age> parameter is unspecified or non-numeric, then the API should return an empty object


/calculatePrice

Parameters:

id[i]: >the ID of the i>th Toy to include in the calculation

qty[i]: >the quantity of the i>th Toy to include in the calculation

Example usage: /calculatePrice?id[0]=123&qty[0]=2&id[1]=456&qty[1]=3

Description:

This API calculates the total price of purchasing the specified quantities of the Toys with the corresponding IDs, using the Toys’ price from the database.

For each i, >this API finds the Toy with the ID equal to the id[i]> parameter and determines the subtotal for that Toy by multiplying its price by the specified quantity qty[i]>. It then uses the subtotals for all Toys to calculate the total price.

The return value is an object that has two properties:

“totalPrice”: the calculated total for all Toys.

“items”: an array containing objects that hold information about the Toys that are included; for each Toy, there should be an object with these three properties:

“item”: the Toy’s ID, as specified in the query

“qty”: the quantity of the Toy, as specified in the query

“subtotal”: the Toy’s price multiplied by the quantity

If an id> parameter does not correspond to the ID of a Toy in the database, then that ID and the corresponding quantity should be ignored

If a qty> parameter is less than one or non-numeric, then it and the corresponding id> parameter should be ignored

If the same id> parameter is specified more than once, then the total quantity for that Toy should be considered as the sum of all corresponding qty> parameters. However, if any such qty> parameter is less than one or non-numeric, that parameter should be ignored.

If all id>/qty> parameters are to be ignored because of the above, then the API should return an object with “totalPrice” set to 0 and “items” set to an empty array

The API should return an empty object if:

- There are no query parameters specified in the request

- The number of id> parameters does not match the number of qty> parameters
