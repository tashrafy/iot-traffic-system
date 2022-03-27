#!/bin/bash

# Start dockerized applications:
#	- MongoDB
# 	- Iot Inspector Local
# 	- Iot Inspector Agent
# 	- Iot Traffic Lights
export UUID=$(cat /proc/sys/kernel/random/uuid)
echo $UUID
docker-compose up -d &

# Start standalone applications:
# 	- Iot Sound Modality
export ENABLE_AUDIO=false
if [ true"${ENABLE_AUDIO}" == "true" ]; then 
	sleep 45
	cd iot-traffic-sound
	export WARNING_TRAFFIC_TTS="A flow of potentially concerning traffic has been identified from a device on the network."
	export TRACKING_TRAFFIC_TTS="A flow of tracking traffic has been identified from a device on the network."
	npm run start
	cd ../
