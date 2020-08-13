# Stage 1 - Build
FROM node:12-slim AS build
WORKDIR /app/api

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Compose the application configuration - only for the local container build
COPY ./src/config/configs ../configs/
RUN npm run build-config:docker


# Stage 2 - Run
FROM node:12-slim

WORKDIR .

RUN INSTALL_PKGS="curl" && \
    apt-get update && \
    apt-get install -y $INSTALL_PKGS && \
    apt-get clean

ADD ./docker-entrypoint.sh /opt/
COPY --from=build /app/api/dist/ /opt/app-root/src/
COPY --from=build /app/api/node_modules/ /opt/app-root/src/node_modules/

# Add the application configuration to the container - only for the local container build
COPY --from=build /app/api/src/config/config.json /opt/app-root/src/config/config.json

RUN chmod +x /opt/docker-entrypoint.sh

ENTRYPOINT ["/opt/docker-entrypoint.sh"]

EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=1s CMD curl --fail http://localhost:8080/actuator/health | grep -iq '{"status":"UP"}'
