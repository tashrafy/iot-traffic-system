FROM jrei/systemd-debian:latest

RUN apt-get update && apt-get install -y mplayer mpg123 bluez expect dbus-x11 pulseaudio-module-bluetooth avahi-daemon nodejs npm alsa-utils sudo
RUN usermod -a -G audio root

ADD simple-bluetooth-agent.sh /bin/simple-bluetooth-agent.sh
ADD simple-bluetooth-agent.sh /usr/local/bin/simple-bluetooth-agent.sh
ADD start.sh /bin/start.sh
RUN mkdir /var/run/dbus
RUN mkdir -p /root/.config
RUN mkdir -p /root/.config/pulse

RUN ls -al /root/.config
RUN ls -al /root/.config/pulse
RUN cat /etc/pulse/client.conf
RUN sed -re 's/^load-module (module-console-kit|module-udev-detect|module-detect)/#\0/' -i /etc/pulse/default.pa \
    && echo 'load-module module-switch-on-connect' >> /etc/pulse/default.pa \
    && echo 'load-module module-native-protocol-tcp auth-anonymous=1' >> /etc/pulse/default.pa \
    && echo 'load-module module-udev-detect' >> /etc/pulse/default.pa
RUN sed -re 's/#DiscoverableTimeout =.*$/DiscoverableTimeout = 0/' -e 's/#Class =.*$/Class = 0x200414/' -i /etc/bluetooth/main.conf
RUN cp -r /etc/pulse /root/.config
RUN chown -R 1000:1000 /root/.config
RUN chown -R 1000:1000 /root/.config/pulse
RUN chmod 777 /root/.config
RUN chmod 777 /root/.config/pulse
RUN ls -al /root/.config/pulse
ENV PULSEAUDIO_SYSTEM_START=1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
COPY start.sh /scripts/start.sh
RUN ["chmod", "+x", "/scripts/start.sh"]
ENTRYPOINT ["/scripts/start.sh"]

# CMD ["npm", "run", "start"]
