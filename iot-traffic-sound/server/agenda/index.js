import { v4 as uuidv4 } from 'uuid';
import Agenda from "agenda";
import {each, isEmpty} from "lodash";
import config from "../config/environment";
import tts from "../services/text-to-speech";
import axios from 'axios';
var opts;
const player = require('play-sound')(opts = {});
const { exec } = require('child_process');
const endpoint = `http://${config.domain}:${config.port}`;
const moment = require("moment");
require("moment-timezone");

const agenda = new Agenda({
  db: {
    address: config.mongo.uri,
  },
});

async function scheduleReoccurringJob(name, interval, timezone, data) {
  const job = agenda.create(name, data);
  job.repeatEvery(interval, {
    timezone,
  });
  job.computeNextRunAt();
  await job.save();
}

agenda.on("ready", () => {
  console.log('AGENDA INITIALIZED');
  console.log(endpoint, config.audio);

  agenda.defaultConcurrency(50);

  agenda.define("Initialize Capture", async function(job, done) {
    const userId = uuidv4();

    await scheduleReoccurringJob("Collect Traffic", "2 seconds", "America/New_York", userId);

    if (config.audio.enabled) {
      await scheduleReoccurringJob("Run Audio Modality", "10 seconds", "America/New_York", userId);
    }

    done();
  });

  agenda.define("Collect Traffic", async function(job, done) {
    const userId = job.attrs.data;
    const { data: devices } = await axios.get(`${endpoint}/api/iot-inspector/subscribe`);
    const { data: traffic } = await axios.get(`${endpoint}/api/iot-inspector/get_traffic`, {
      params: {
        userId
      }
    });

    done();
  });

  agenda.define("Run Audio Modality", async function(job, done) {
    const { trackingTraffic, regularTraffic } = await getTrackingData(job.attrs.data);

    console.log("running audio modality");

    if (trackingTraffic) {
      console.log("trackingTraffic", trackingTraffic);

      player.play('./tracking-traffic-english.mp3', (err) => {
        console.log("err", err);
        if (err) throw err
      })
    } else if (regularTraffic) {
      console.log("regularTraffic", regularTraffic);

      player.play('./warning-traffic-english.mp3', (err) => {
        console.log("err", err);
        if (err) throw err
      })
    }

    done();
  });

  agenda.now("Initialize Capture");

  agenda.on("start", (job) => {
    // log necessary info
  });

  agenda.on("success", (job) => {
    // log necessary info
  });
  agenda.on("fail", (err, job) => {
    // log necessary info
  });

  // agenda.cancel({name: cleanUpJob.jobName}, () => {
  //   agenda.every("0 0 * * *", cleanUpJob.jobName);
  // });

  if (config.env === "production") {
    // agenda.cancel({name: clientJobSchedulerJob.jobName}, () => {
    //   agenda.every("0 0 * * *", clientJobSchedulerJob.jobName);
    // });
  }
});

async function getTrackingData(userId) {
  const { data: traffic } = await axios.get(`${endpoint}/api/iot-inspector/aggregate_traffic`, {
    params: {
      userId
    }
  });
  console.log("getTrackingData", traffic);
  const trackingTraffic = traffic.find(item => item._id.isTracking);
  const regularTraffic = traffic.find(item => !item._id.isTracking);

  return { trackingTraffic, regularTraffic };
}

function graceful() {
  agenda.stop(() => {
    process.exit(0);
  });
}

process.on("SIGTERM", graceful);
process.on("SIGINT" , graceful);

export {agenda};
