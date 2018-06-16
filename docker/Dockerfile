FROM google/nodejs

RUN mkdir -p /app
RUN mkdir -p /app/views
RUN mkdir -p /app/public
RUN mkdir -p /app/handlers 
ADD ./server.js /app
ADD ./package.json /app 
ADD ./views /app/views
ADD ./public /app/public
ADD ./handlers /app/handlers

RUN npm install
EXPOSE 8080
ENTRYPOINT node /app/server.js