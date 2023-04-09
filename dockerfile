FROM node:16.16.0-alpine
# Set working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Set environment variables
ENV PORT=3000
ENV NODE_ENV=development

# Expose port for development server
EXPOSE ${PORT}

# Start the development server with hot reloading
CMD ["npm", "run", "dev"]

# Debugging configuration
ENV DEBUG_PORT=9229
ENV DEBUG_HOST=0.0.0.0
ENV NODE_OPTIONS=--inspect-brk=0.0.0.0:${DEBUG_PORT}