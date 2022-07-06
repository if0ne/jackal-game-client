# pull official base image
FROM node:latest
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]