FROM node:14.17.1-slim

WORKDIR /backend

COPY --chown=node ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY --chown=node . .

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV PORT=3000

EXPOSE ${PORT}

CMD [ "node", "." ]

