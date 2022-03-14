import axios from 'axios';
import IoTInspector from './iot-inspector.model';
import { iotInspector } from '../../config/environment';

export async function subscribeDevices(req, res) {
  try {
    const response = await axios.get(`${iotInspector.domain}/get_device_list`);
    const data = response.data;
    const devices = [];

    for (const key in data) {
      devices.push(key);
      await axios.get(`${iotInspector.domain}/enable_inspection/${key}`);
    }

    return res.json(devices);
  } catch (error) {
    console.log('Error:', error);
    return res.status(error.statusCode || 500).send(error.message);
  }
}

export async function getTraffic(req, res) {
  try {
    const devices = [];

    if (!req.query.userId) {
      return res.json(devices);
    }

    const response = await axios.get(`${iotInspector.domain}/get_traffic`);
    const data = response.data;

    for (const key in data) {
      for (const destination in data[key]) {
        const capture = new IoTInspector();

        capture.userId = req.query.userId;
        capture.deviceName = key;
        capture.destinationIp = destination;
        capture.protocol = data[key][destination].protocol;
        capture.hostname = data[key][destination].hostname;
        capture.isTracking = data[key][destination].is_tracking;
        capture.inboundBytes = data[key][destination].inbound_bytes_per_second;
        capture.outboundBytes = data[key][destination].outbound_bytes_per_second;
        // console.log("capture", capture);

        await capture.save();
      }
      devices.push(key);
    }

    return res.json(devices);
  } catch (error) {
    console.log('Error:', error);
    return res.status(error.statusCode || 500).send(error.message);
  }
}

export async function aggregateTraffic(req, res) {
  try {
    if (!req.query.userId) {
      return res.json({});
    }

    const trafficData = await IoTInspector.aggregate([{
      $match: {
        "userId": req.query.userId
      }
    }, {
      $group: {
        _id: {
          isTracking: "$isTracking",
          protocol: "$protocol"
        },
        inboundBytesTotal: { $sum: "$inboundBytes" },
        outboundBytesTotal: { $sum: "$outboundBytes" },
      }
    }])
    .exec();

    const clearData = await IoTInspector.deleteMany({ userId: req.query.userId });

    return res.json(trafficData);
  } catch (error) {
    console.log('Error:', error);
    return res.status(error.statusCode || 500).send(error.message);
  }
}
