#!/bin/bash

echo "Starting MongoDB..."
mongod --bind_ip_all --dbpath=/var/opt/mongo &

/opt/initdb/initdb.sh

tail -f /var/opt/initdb/log/initdb.log
