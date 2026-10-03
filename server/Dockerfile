FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY index.js ./
COPY data ./data
COPY ea ./ea

ENV PORT=8787
EXPOSE 8787

CMD ["npm", "start"]
