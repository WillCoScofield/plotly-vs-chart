# Use the same tag as the Webapp's to save the build time
FROM nginx:1.16

WORKDIR .

RUN INSTALL_PKGS="curl" && \
    apt-get update && \
    apt-get install -y $INSTALL_PKGS && \
    apt-get clean

ADD nginx/nginx.conf /etc/nginx/nginx.conf
ADD nginx/nginx-server-block.conf /opt/app-root/etc/nginx.default.d/nginx-server-block.conf
ADD actuator/health.json /opt/app-root/src/actuator/

EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=1s CMD curl --fail http://localhost:8080/actuator/health.json | grep -iq '{"status":"UP"}'
