FROM ubuntu:22.04

VOLUME [/var/log/squid /var/spool/squid]
EXPOSE 3128

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive\
  && apt-get install -y --no-install-recommends squid-openssl \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh

# USER privoxy
ENTRYPOINT ["/entrypoint.sh"]
CMD ["-f", "/etc/squid/squid.conf", "-NYC"]