# Build frontend
FROM node:20 AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Build backend
FROM node:20 AS backend
WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend ./backend
COPY --from=frontend /app/frontend/build ./frontend/build

# Start server
WORKDIR /app/backend
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server.js"]