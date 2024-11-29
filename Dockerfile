# Dockerfile
FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV PORT 8080
# Change this URL bellow with your model URL
ENV MODEL_URL        
COPY . .
EXPOSE 8080
CMD [ "npm", "run", "start"]
