#!/bin/bash

# Setup DNS from configuration (this is ugly here)
cat /etc/hosts /app/config/etc_hosts | sort | uniq > /tmp/hosts_tmp && mv /tmp/hosts_tmp /etc/hosts

env_file=/app/config/environment.sh

test -f $env_file && source $env_file

env

cd ${DIST_FOLDER}; npm start
