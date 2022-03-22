#!/bin/bash

docker-compose stop
docker-compose down
docker image rm iot-traffic-agent iot-traffic-lights