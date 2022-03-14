// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI ||
         process.env.MONGOHQ_URL ||
         process.env.OPENSHIFT_MONGODB_DB_URL +
         process.env.OPENSHIFT_APP_NAME ||
         'mongodb://root:example@localhost:27017/iot-traffic-lights-dev?authSource=admin'
         // 'mongodb://localhost/iot-traffic-lights-dev'
  },

  // Seed database on startup
  seedDB: true

};
