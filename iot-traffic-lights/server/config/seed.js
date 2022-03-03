/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

import IoTInspector from '../api/iot-inspector/iot-inspector.model';

// IoTInspector.find({}).remove()
//   .then(() => {
//     IoTInspector.create({
//       name: 'Anne',
//       phone: '1231237542'
//     }, {
//       name: 'Dillon',
//       phone: '1231237542'
//     }, {
//       name: 'Joe',
//       phone: '1231233215'
//     }, {
//       name: 'Bob',
//       phone: '1231237542'
//     });
//   });
