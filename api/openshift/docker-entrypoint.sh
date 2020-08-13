#!/bin/bash

declare -a CURL_OPTIONS
CURL_OPTIONS+=("--fail")
CURL_OPTIONS+=("--retry-connrefused")
CURL_OPTIONS+=("--retry" "100")
CURL_OPTIONS+=("--retry-delay" "10")
CURL_OPTIONS+=("--retry-max-time" "600")

curl "${CURL_OPTIONS[@]}" "${CONFIG_SERVER_URL}/${SPBC_CLOUD_CONFIG_LABEL}/hca-fcm-api-${PROFILE}.json"|jq . > /opt/app-root/src/config/config.json

node /opt/app-root/src/server.js
