# Use the official Node.js image as the base image
FROM node:18

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend code to the working directory in the container
COPY . .

# Expose port 3000 for the backend
EXPOSE 3000

# Command to run the server
CMD ["node", "server.js"]
