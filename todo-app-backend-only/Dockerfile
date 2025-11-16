FROM node:24


WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

CMD ["sh", "-c", "npm run db:deploy && npm run dev"]