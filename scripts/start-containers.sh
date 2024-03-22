#!/bin/bash

docker compose -f infrastructure/prod/docker-compose.yml up --build

#sh scripts/start-containers.sh 