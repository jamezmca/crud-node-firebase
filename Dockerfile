#
# ---- Build ----
FROM node:16.17.0-alpine AS build
ARG WORK_DIR=/var/www/node
WORKDIR ${WORK_DIR}
# accept npm token to access private npm registry from build arg
ARG NPM_AUTH_TOKEN
# copy ALL except ignored by .dockerignore
COPY . .
# install ALL node_modules, including 'devDependencies'
RUN npm ci
# build
RUN npm run build
# prune production package
RUN rm -rf node_modules && npm ci --production

#
# ---- Release ----
FROM node:16.17.0-alpine AS release
ARG WORK_DIR=/var/www/node
WORKDIR ${WORK_DIR}
# copy the rest of files
COPY --from=build ${WORK_DIR}/ ./
# define CMD
CMD npm run start:prod