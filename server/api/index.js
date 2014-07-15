module.exports = function(app) {

  // Initialize all REST endpoints.
  require('./pricing')(app);
  require('./products')(app);
  require('./cart')(app);

};
