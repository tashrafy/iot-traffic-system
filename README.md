# IoT Traffic Lights
This application leverages the Philip's Hue API to set the hue and brightness of a user's smart lights based on the flow of traffic received from the IoT Inspector API.  To mock the Philip's Hue smart lights, we will use an emulator to reproduce similar behaviors.

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^14.16.1
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

## Getting Started
1. First, clone and setup the [IoT Inspector API](https://github.com/nyu-mlab/iot-inspector-local) and run the local webserver.  [Follow the README.md](https://github.com/nyu-mlab/iot-inspector-local/tree/master/src) provided on the repository.   
2. Next, clone and setup the [Hue Emulator](https://steveyo.github.io/Hue-Emulator/) to mock the smart lights for this application.
3. Finally, clone this application.

### Developing

1. Run `npm install` to install server dependencies.
2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running
3. Run `npm start` to start the development server.
