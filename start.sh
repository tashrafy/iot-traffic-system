#!/bin/bash

docker-compose up -d mongo iot-inspector-local
sleep 10
docker-compose up iot-traffic-lights &
sleep 30
cd iot-traffic-sound
npm run start
cd ../