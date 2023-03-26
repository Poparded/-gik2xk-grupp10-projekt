// Import the Express library and create a router instance
const router = require('express').Router();

// Import a database model
const db = require('../models');

// Import the `validate.js` library for input validation
const validate = require('validate.js');

// Import a user service module
const userService = require("../services/userService");

// Import the `JSON` object from the `sequelize` library
const { JSON } = require('sequelize');

// Define a route handler for GET requests to the root path
router.get('/', (req, res) => {
  // Call a method to get all users from the user service
  userService.getAllusers().then((result) => {
    // Send the response with the status code and data from the user service
    res.status(result.status).json(result.data);
  }).catch((error) => {
    // Send an error response with the error message and status code
    res.status(error.status).json({ error: error.message });
  });
});

// Define a route handler for POST requests to the root path
router.post('/', (req, res) => {
  // Get the user object from the request body
  const user = req.body

  // Call a method to add the user to the user service
  userService.addUsers(user).then((result) => {
    // Send the response with the status code and data from the user service
    res.status(result.status).json(result.data);
  })
});

// Define a route handler for DELETE requests to the root path
router.delete('/', (req, res) => {
  // Get the user ID from the request body
  const id = req.body.id

  // Call a method to delete the user from the user service
  userService.destroy(id).then((result) => {
    // Send the response with the status code and data from the user service
    res.status(result.status).json(result.data);
  })
});

// Define a route handler for PUT requests to the root path
router.put("/", (req, res) => {
  // Get the user ID and user object from the request body
  const id = req.body.id
  const user = req.body;

  // Call a method to update the user in the user service
  userService.update(user, id).then((result) => {
    // Send the response with the status code and data from the user service
    res.status(result.status).json(result.data)
  })
});

// Define a route handler for GET requests to the review path with an ID parameter
router.get("/:id/rating", (req, res) => {
  // Get the ID parameter from the request URL
  const id = req.params.id;

  // Call a method to get the review by ID from a product service
  userService.getRatingByUser(id).then((result) => {
    // Send the response with the status code and data from the product service
    res.status(result.status).json(result.data);
  });
});

// Export the router to make it available to other modules
module.exports = router;
