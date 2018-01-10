#!/bin/bash
# REMOTE="root@46.101.114.92"
REMOTE="pi@192.168.1.73"
HOME_PATH="/var/www/studio"
LOCAL_PATH="$(cd "$(dirname "$0")" && pwd)"

echo "Deploying ${LOCAL_PATH} on ${REMOTE}:${REMOTE_PATH}/"
rsync -a "${LOCAL_PATH}/" "${REMOTE}:${HOME_PATH}/." --rsync-path="sudo rsync"
echo "Done"
