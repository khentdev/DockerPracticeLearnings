FROM node:24 AS builder
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci --include=dev

COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src

RUN npx prisma generate

RUN npm run build

FROM node:24
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/generated ./generated

CMD ["node", "dist/src/server.js"]