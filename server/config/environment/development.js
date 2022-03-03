// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI ||
         process.env.MONGOHQ_URL ||
         process.env.OPENSHIFT_MONGODB_DB_URL +
         process.env.OPENSHIFT_APP_NAME ||
         'mongodb://localhost/iot-traffic-lights-dev'
  },

  // Seed database on startup
  seedDB: true

};
