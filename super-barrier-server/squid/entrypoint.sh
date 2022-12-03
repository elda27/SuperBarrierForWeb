#! /bin/bash
mkdir -p /var/lib/squid
rm -rf /var/lib/squid/ssl_db
/lib/squid/security_file_certgen -c -s /var/lib/squid/ssl_db -M 20MB

tail -F /var/log/squid/access.log 2>/dev/null &
tail -F /var/log/squid/error.log 2>/dev/null &
tail -F /var/log/squid/store.log 2>/dev/null &
tail -F /var/log/squid/cache.log 2>/dev/null &
# create missing cache directories and exit
/usr/sbin/squid -Nz
/usr/sbin/squid "$@"