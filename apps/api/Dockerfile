FROM node:22-alpine

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies and rebuild bcrypt
RUN pnpm install && pnpm rebuild bcrypt

# Copy source code
COPY . .

# Build TypeScript
RUN pnpm run build

# Expose port
EXPOSE 6001

# Start the application
CMD ["pnpm", "run", "start"]
