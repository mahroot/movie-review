# Backend: Node.js + Express
FROM node:20-alpine

WORKDIR /app

COPY package.json .
# Using npm install to avoid lockfile requirement in this starter
RUN npm install --only=production

# Copy source
COPY src ./src

ENV NODE_ENV=production

EXPOSE 5000
CMD ["node", "src/index.js"]
