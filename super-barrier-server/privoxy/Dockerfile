FROM ubuntu:22.04

VOLUME [ "/etc/privoxy" ]
EXPOSE 8118

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive\
  && apt-get install -y privoxy wget

COPY ./entrypoint.sh /entrypoint.sh


RUN groupadd privoxy\
  && usermod -g privoxy privoxy \
  && mkdir -p /opt/privoxy/etc/certs \
  && chown -R privoxy:privoxy /opt/privoxy/

ENTRYPOINT ["/entrypoint.sh"]
