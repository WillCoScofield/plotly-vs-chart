FROM scratch

COPY ./docker-entrypoint.sh /opt/
ADD . /opt/app-root/src

USER 0

RUN INSTALL_PKGS="jq iputils" && \
    yum update -y && \
    yum install -y --setopt=tsflags=nodocs \
      $INSTALL_PKGS && \
    yum clean all -y && \
    rm -rf /var/cache/yum && \
    dnf clean all && \
    rm -rf /var/cache/dnf/*

RUN chmod +x /opt/docker-entrypoint.sh
RUN mkdir -p /opt/app-root/src/config
RUN chmod a=+rwx /opt/app-root/src/config

USER 1001

ENTRYPOINT ["/opt/docker-entrypoint.sh"]

EXPOSE 8080
