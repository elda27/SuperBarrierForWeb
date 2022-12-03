#! /bin/bash -eux
mkdir -p ./squid/certs
pushd ./squid/certs
openssl dhparam -outform PEM -out server_dhparam.pem 2048
openssl req -new -newkey rsa:2048 -days 3650 -nodes -x509 -keyout server.key -out server.crt
# openssl req -new -x509 -extensions v3_ca -keyout server.key -out server.crt -days 3650
popd

mkdir -p ./privoxy/certs
pushd ./privoxy/certs
openssl req -new -x509 -extensions v3_ca -keyout cakey.pem -out cacert.crt -days 3650
popd