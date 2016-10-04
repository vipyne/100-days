#!/bin/bash

# currently working script (when accompanied with proper file structure)

loops="$1"

for i in $(ls rainbow_frames/1_intro); do
  xattr -wx com.apple.metadata:_kMDItemUserTags \ "`xattr -px com.apple.metadata:_kMDItemUserTags ./rainbow_frames/1_intro/$i`" animated_rainbow;
  rm -rf untitled*
  osascript -e 'tell application "Finder" to delete (make new folder at (front window) with properties {name:"_"})' > ./unused/err.txt;
done

for ((n = 0; n < $loops; n++)); do
  for i in $(ls rainbow_frames/2_loop); do
    xattr -wx com.apple.metadata:_kMDItemUserTags \ "`xattr -px com.apple.metadata:_kMDItemUserTags ./rainbow_frames/2_loop/$i`" animated_rainbow;
    rm -rf untitled*
    osascript -e 'tell application "Finder" to delete (make new folder at (front window) with properties {name:"_"})' > ./unused/err.txt;
  done
done

for i in $(ls rainbow_frames/3_outro); do
  xattr -wx com.apple.metadata:_kMDItemUserTags \ "`xattr -px com.apple.metadata:_kMDItemUserTags ./rainbow_frames/3_outro/$i`" animated_rainbow;
  rm -rf untitled*
  osascript -e 'tell application "Finder" to delete (make new folder at (front window) with properties {name:"_"})' > ./unused/err.txt;
done