#!/bin/bash

env_file=/app/config/environment.sh

test -f $env_file && source $env_file

env

cd ${DIST_FOLDER}; npm start > logs/application.log 2>&1
