# Stage 1 - Build
FROM registry.hub.docker.com/library/mongo:4.2-bionic

COPY ./docker-entrypoint.sh /opt/
COPY ./initdb /opt/initdb/
ADD ./initdb/data/V1.0__Initial_data_fcm_facilities.tar.gz /opt/initdb/data

USER 0

RUN mkdir -p /var/opt/initdb/log

RUN chmod +x /opt/docker-entrypoint.sh
RUN chmod +x /opt/initdb/initdb.sh

ENTRYPOINT ["/opt/docker-entrypoint.sh"]

EXPOSE 27017

HEALTHCHECK --interval=10s --timeout=1s CMD mongo --eval "print(\"waited for connection\")" && grep -q "========== DATABASE SUCCESSFULLY INITIALIZED ==========" /var/opt/initdb/log/initdb.log
