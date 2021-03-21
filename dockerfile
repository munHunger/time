FROM node:alpine
RUN mkdir -p /tmp/time
WORKDIR /tmp/time
ADD . .
RUN npm install && chmod +x start.sh
CMD ["./start.sh"]