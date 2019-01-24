#!/bin/bash

DATE=$(date +"%Y-%m-%d_%I:%M%p")
WIDTH=600
HEIGHT=800
QUALITY=25
ROTATION=180
DELAY=1500
EXPOSURE_MODE=auto
# 100-800
#ISO=300
PICTURE_PATH=/home/homeassistant/.homeassistant/camera
IMAGE_EFFECT=none
# -100 - 100 (default 0)
CONTRAST=0
# See below for details
# "average", "spot", "matrix", "backlit"
METERING=matrix
# Sets the shutter speed to the specified value (in microseconds). 
# There's currently an upper limit of approximately 6000000us (6000ms, 6s)
#SHUTTER_SPEED=100000

# Darken the lights, lighten the darks
# "off", "low", "med", "high"
DRC=low

#COMMAND="raspistill -o $PICTURE_PATH/$1 -w $WIDTH -h $HEIGHT -q $QUALITY -rot $ROTATION --annotate $DATE -t $DELAY -ex $EXPOSURE_MODE --ISO $ISO --imxfx $IMAGE_EFFECT --metering $METERING --drc $DRC --contrast $CONTRAST"
COMMAND="raspistill -o $PICTURE_PATH/$1 -w $WIDTH -h $HEIGHT -q $QUALITY -rot $ROTATION --annotate $DATE -t $DELAY -ex $EXPOSURE_MODE --imxfx $IMAGE_EFFECT --metering $METERING --drc $DRC --contrast $CONTRAST"

echo "RUNNING COMMAND:"
echo $COMMAND
$COMMAND

# EXPOSURE MODES:
# auto: use automatic exposure mode
# night: select setting for night shooting
# nightpreview:
# backlight: select setting for backlit subject
# spotlight:
# sports: select setting for sports (fast shutter etc.)
# snow: select setting optimised for snowy scenery
# beach: select setting optimised for beach
# verylong: select setting for long exposures
# fixedfps: constrain fps to a fixed value
# antishake: antishake mode
# fireworks: select setting optimised for fireworks

# METERING MODES:
# average: average the whole frame for metering
# spot: spot metering
# backlit: assume a backlit image
# matrix: matrix metering

# IMAGE EFFECTS:
# none: no effect (default)
# negative: invert the image colours
# solarise: solarise the image
# posterise: posterise the image
# whiteboard: whiteboard effect
# blackboard: blackboard effect
# sketch: sketch effect
# denoise: denoise the image
# emboss: emboss the image
# oilpaint: oil paint effect
# hatch: hatch sketch effect
# gpen: graphite sketch effect
# pastel: pastel effect
# watercolour: watercolour effect
# film: film grain effect
# blur: blur the image
# saturation: colour saturate the image
# colourswap: not fully implemented
# washedout: not fully implemented
# colourpoint: not fully implemented
# colourbalance: not fully implemented
# cartoon: not fully implemented
