FROM node:fermium
RUN apt-get update
RUN apt-get install curl -y
RUN apt-get install apt-transport-https ca-certificates -y
RUN apt-get update 
RUN mkdir /myapp
WORKDIR /myapp
COPY package.json /myapp/package.json
RUN npm install
COPY . /myapp
CMD ["npm", "start"]