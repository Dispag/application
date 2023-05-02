FROM node:16.3.0-alpine as builder

RUN apk add --no-cache --update

USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app

EXPOSE 3000

ENV NPM_CONFIG_LOGLEVEL info
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN npm install -g npm@9.6.5

COPY --chown=node:node ./ /home/node/app/

RUN npm i

RUN npm run compile
RUN npm run build


FROM node:16.3.0-alpine AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /home/node/app/.build ./

EXPOSE 3000

ENV PORT 3000