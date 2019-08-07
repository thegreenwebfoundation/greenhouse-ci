FROM debian:stretch

RUN apt-get update && \
  apt-get install --fix-missing -y git jq wget curl gnupg fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libcairo2 libcups2 libdbus-1-3 libexpat1 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release xdg-utils && \
  rm -rf /var/lib/{apt,dpkg,cache,log}/

# Install latest stable Chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
  dpkg -i google-chrome-stable_current_amd64.deb && \
  rm google-chrome-stable_current_amd64.deb

# Install NodeJS 10
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
  apt-get install -y nodejs && \
  rm -rf /var/lib/{apt,dpkg,cache,log}/

COPY ./lib  ./lib
COPY ./server  ./server
COPY ./output  ./output

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install
# ADD ci-run.sh /usr/local/bin/ci-run.sh
CMD [ "npm", "start" ]
