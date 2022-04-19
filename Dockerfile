FROM node:alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json       ./
#COPY ./.yarn/plugins    ./.yarn/plugins
#COPY ./.yarn/releases   ./.yarn/releases
#COPY .yarnrc.yml        ./
#COPY yarn.lock          ./

#RUN yarn workspaces focus --production
RUN npm i --ignore-scripts --legacy-peer-deps --only=production

FROM node:alpine AS builder
WORKDIR /app

COPY --from=deps ./app                   ./
COPY             ./public                ./public
COPY             ./src                   ./src
COPY             .env                    ./
COPY             next-env.d.ts           ./
COPY             next.config.js          ./
COPY             tsconfig.json           ./

#RUN yarn build
RUN npm run build

FROM node:alpine AS runner
WORKDIR /app

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static
COPY --from=builder                       /app/public           ./public
COPY --from=builder                       /app/next.config.js   ./
COPY --from=builder                       /app/package.json     ./
#COPY --from=builder                       /app/.pnp.cjs         ./

RUN addgroup --system --gid 1001 nodejs
RUN adduser  --system --uid 1001 nextjs
USER nextjs

#CMD node -r ./.pnp.cjs server.js
CMD node server.js
