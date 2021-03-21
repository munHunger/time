FROM node:alpine
RUN mkdir -p /tmp/time
WORKDIR /tmp/time
ADD . .
RUN npm install
CMD ["npm", "run", "dev"]