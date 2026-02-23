# ---------- Stage 1: Build Frontend ----------
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend
COPY recipe-platform-frontend/package*.json ./
RUN npm install
COPY recipe-platform-frontend ./
RUN npm run build


# ---------- Stage 2: Build Backend ----------
FROM node:20-alpine AS backend-builder

WORKDIR /app/backend
COPY recipe-platform-backend/package*.json ./
RUN npm install
COPY recipe-platform-backend ./
RUN npx prisma generate
RUN npm run build


# ---------- Stage 3: Production ----------
FROM node:20-alpine

WORKDIR /app

# Copy backend build
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/node_modules ./node_modules
COPY --from=backend-builder /app/backend/package*.json ./

COPY --from=backend-builder /app/backend/prisma ./prisma
COPY --from=backend-builder /app/backend/node_modules/.prisma ./node_modules/.prisma

# Copy frontend build
COPY --from=frontend-builder /app/frontend/dist ./recipe-platform-frontend/dist

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/server.cjs"]

# # ---------- Stage 1: Build ----------
# FROM node:20-alpine AS builder

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npx prisma generate
# RUN npm run build


# # ---------- Stage 2: Production ----------
# FROM node:20-alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm install --omit=dev --ignore-scripts

# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# EXPOSE 3000

# CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/server.cjs"]

# FROM node:20-alpine

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npx prisma generate

# EXPOSE 3000

# CMD ["npm", "run", "dev"]
