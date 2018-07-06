#!/usr/bin/env bash

plugin="/Users/$(whoami)/Library/Application Support/com.bohemiancoding.sketch3/Plugins/Stuffing.sketchplugin"
mkdir "${plugin}"
mkdir -p "${plugin}/Contents"

ln -s "$(pwd)/assets" "${plugin}/Contents/Resources"
ln -s "$(pwd)/src" "${plugin}/Contents/Sketch"
