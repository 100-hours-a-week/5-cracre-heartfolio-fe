FROM node:22.2.0

COPY package.json package-lock.json ./
COPY . .

RUN npm install

EXPOSE 3000

#ENV NODE_ENV production

ENTRYPOINT ["npm", "start"]
