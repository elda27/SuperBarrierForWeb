#! /bin/bash
pushd /opt/privoxy/etc/certs
wget https://curl.se/ca/cacert.pem
mv cacert.pem trustedCAs.pem
chown privoxy:privoxy trustedCAs.pem
popd

mkdir -p /opt/privoxy/ca \
  && chown privoxy:privoxy /opt/privoxy/ca\
  && chmod 700 /opt/privoxy/ca

/usr/sbin/privoxy --no-daemon --user privoxy.privoxy /etc/privoxy/config