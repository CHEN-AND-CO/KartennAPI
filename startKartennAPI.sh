#!/bin/sh

set -e

MANAGER="yarn"

screen -Dm -S --deep kartennAPI $MANAGER start