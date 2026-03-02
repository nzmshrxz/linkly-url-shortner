const express = require('express');
const Router = express.Router();
const { handleGenerateUrl, handleRedirect, handleGetUserUrls,deleteUrlbyID } = require('../controllers/url');
const auth = require('../middleware/auth');
const optionalAuth = require('../middleware/optionalauth')

// Logged-in users can shorten URLs
Router.post('/', optionalAuth, handleGenerateUrl);

// Logged-in users can see their URLs
Router.get('/my-links', auth, handleGetUserUrls);

//logged-in users can delete their 
Router.delete("/:shortid", auth, deleteUrlbyID )

// Public redirect
// Router.get('/:shortid', handleRedirect);

module.exports = Router;
