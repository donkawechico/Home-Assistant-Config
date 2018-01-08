#!/bin/bash

WIDTH=640
HEIGHT=480
PICTURE_PATH=/home/homeassistant/.homeassistant/camera
VIDEO_ID=$1
IMAGE_NAME=$2

/usr/bin/fswebcam -d /dev/video$1 -r $WIDTHx$HEIGHT $PICTURE_PATH/$IMAGE_NAME
