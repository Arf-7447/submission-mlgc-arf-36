# Dockerfile
FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN sudo apt-get update && \
sudo apt-get install -y python3 build-essential && \
npm install && \
sudo apt-get clean && \
sudo rm -rf /var/lib/apt/lists/*
ENV PORT 8080
# Change this URL bellow with your model URL
ENV MODEL_URL        
COPY . .
EXPOSE 8080
CMD [ "npm", "run", "start"]
