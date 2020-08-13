# Use the same tag as the Webapp's to save the build time
FROM nginx:1.16

WORKDIR .

RUN INSTALL_PKGS="curl" && \
    apt-get update && \
    apt-get install -y $INSTALL_PKGS && \
    apt-get clean

ADD conf.d/default.conf /etc/nginx/conf.d/default.conf
ADD cert/ /etc/nginx/cert/
ADD actuator/health.json /opt/app-root/src/actuator/

EXPOSE 443

HEALTHCHECK --interval=10s --timeout=1s CMD curl -fk https://localhost:443/actuator/health.json | grep -iq '{"status":"UP"}'
