import mongoose from 'mongoose';

var IoTInspectorSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  deviceName: {
    type: String
  },
  isTracking: {
    type: Boolean
  },
  destinationIp: {
    type: String
  },
  hostname: {
    type: String
  },
  protocol: {
    type: Number
  },
  inboundBytes: {
    type: mongoose.Decimal128
  },
  outboundBytes: {
    type: mongoose.Decimal128
  }
});

export default mongoose.model('IoTInspector', IoTInspectorSchema);
