#!/bin/bash

export UUID=$(cat /proc/sys/kernel/random/uuid)
echo $UUID
docker-compose up -d &
sleep 45
echo $UUID
cd iot-traffic-sound
npm run start
cd ../