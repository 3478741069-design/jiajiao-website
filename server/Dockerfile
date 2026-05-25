FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm install -g tsx

EXPOSE 3001

CMD ["tsx", "src/index.ts"]
