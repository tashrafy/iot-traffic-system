var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  domain: process.env.DOMAIN || "localhost",

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9001,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'iot-traffic-lights-secret'
  },

  // MongoDB connection options
  mongo: {},

  iotInspector: {
    domain: process.env.IOT_INSPECTOR_DOMAIN || 'http://localhost:46241'
  },

  audio: {
    enabled: Boolean(process.env.ENABLE_AUDIO) || true,
    warningTts: process.env.WARNING_TRAFFIC_TTS || "A flow of potentially concerning traffic has been identified from a device on the network.",
    trackingTts: process.env.TRACKING_TRAFFIC_TTS || "A flow of tracking traffic has been identified from a device on the network."
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./shared'),
  require('./' + process.env.NODE_ENV + '.js') || {});
