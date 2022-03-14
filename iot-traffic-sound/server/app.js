import express from 'express';
import mongoose from 'mongoose';
import config from './config/environment';
import http from 'http';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  // Populate databases with sample data
  if (config.seedDB) { require('./config/seed'); }
})
.catch((err) => {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
