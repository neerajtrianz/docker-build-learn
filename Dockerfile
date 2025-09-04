# Use Node LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the code
COPY . .

# Expose app port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
