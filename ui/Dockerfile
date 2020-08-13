# Stage 1 - Build
FROM node:12-slim AS build
WORKDIR /app/ui

COPY package*.json ./
COPY ui-components.tgz ./
RUN npm install ./ui-components.tgz
RUN npm ci

COPY . .
RUN npm run build -- --prod=true

# Compose the application configuration - only for the local container build
COPY ./src/config/configs ../configs/
RUN npm run build-config:docker


# Stage 2 - Run
FROM nginx:1.16

WORKDIR .

RUN INSTALL_PKGS="curl" && \
    apt-get update && \
    apt-get install -y $INSTALL_PKGS && \
    apt-get clean

ADD ./docker-entrypoint.sh /opt/
ADD nginx/nginx.conf /etc/nginx/nginx.conf
ADD nginx/nginx-server-block.conf /opt/app-root/etc/nginx.default.d/nginx-server-block.conf
COPY --from=build /app/ui/dist/fcm/ /opt/app-root/src/

# Add the application configuration to the container - only for the local container build
COPY --from=build /app/ui/src/config/config.json /opt/app-root/src/config/config.json

RUN chmod +x /opt/docker-entrypoint.sh

ENTRYPOINT ["/opt/docker-entrypoint.sh"]

EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=1s CMD curl --fail http://localhost:8080/actuator/health.json | grep -iq '{"status":"UP"}'
