#!/bin/bash

# WIP

# TODO: finish getting proper / valid hex values for metadata
# clear all metadata after tagging `xattr -c file`
# analyize to be able to manipulate colors
# figure out how to show more than 3 metatags?

 # `mdls` might be useful:
 # mdls -name kMDItemUserTags 510

# ## to extract hex metadata from a file:
# ruby -e 'f=656; final = []; xattr = `xattr -l #{f} | tr -d '\n'`; xattr.split(" ").each { |hex| final.push(hex) if hex.length == 2 }; final = final.join(",").gsub(",",""); p final'


# http://nshipster.com/extended-file-attributes/
# http://arstechnica.com/apple/2013/10/os-x-10-9/9/





#intro
blank="62706C6973743030A0080000000000000101000000000000000100000000000000000000000000000009"

red="62706C6973743030A101555265640A36080A0000000000000101000000000000000200000000000000000000000000000010"
orange_red="62706C6973743030A20102555265640A36584F72616E67650A37080B11000000000000010100000000000000030000000000000000000000000000001A"
yellow_orange_red="62706C6973743030A3010203555265640A36584F72616E67650A375859656C6C6F770A35080C121B0000000000000101000000000000000400000000000000000000000000000024"






                    # "62706C6973743030A3010203584F72616E67650A375859656C6C6F770A3557477265656E0A32080C151E0000000000000101000000000000000400000000000000000000000000000026"
green_yellow_orange="62706C6973743030A3010203584F72616E67650A375859656C6C6F770A3557477265656E0A32080C151E0000000000000101000000000000000400000000000000000000000000000026"
blue_green_yellow="62706C6973743030A30102035859656C6C6F770A3557477265656E0A3256426C75650A34080C151D0000000000000101000000000000000400000000000000000000000000000024"
purple_blue_green="62706C6973743030A301020357477265656E0A3256426C75650A3458507572706C650A33080C141B0000000000000101000000000000000400000000000000000000000000000024"

# loop
grey_purple_blue="62706C6973743030A301020356426C75650A3458507572706C650A3356477261790A31080C131C0000000000000101000000000000000400000000000000000000000000000023"
red_grey_purple="62706C6973743030A301020358507572706C650A3356477261790A31555265640A36080C151C0000000000000101000000000000000400000000000000000000000000000022"
orange_red_grey="62706C6973743030A301020356477261790A31555265640A36584F72616E67650A37080C13190000000000000101000000000000000400000000000000000000000000000022"

# outro
grey_purple="62706C6973743030A2010258507572706C650A3356477261790A31080B14000000000000010100000000000000030000000000000000000000000000001B"
grey="62706C6973743030A10156477261790A31080A0000000000000101000000000000000200000000000000000000000000000011"



loops="$1"



#intro
  xattr -wx com.apple.metadata:_kMDItemUserTags $blank animated_rainbow;
  rm -rf untitled*;
  osascript -e 'tell application "Finder" to delete (make new folder at (front window) with properties {name:"z"})' > ./unused/err.txt;
  xattr -wx com.apple.metadata:_kMDItemUserTags $red animated_rainbow;
  rm -rf untitled*;
  osascript -e 'tell application "Finder" to delete (make new folder at (front window) with properties {name:"z"})' > ./unused/err.txt;
  xattr -wx com.apple.metadata:_kMDItemUserTags $orange_red animated_rainbow;
  rm -rf untitled*;
  osascript -e 'tell application "Finder" to delete (make new folder at (front window) with properties {name:"z"})' > ./unused/err.txt;
  xattr -wx com.apple.metadata:_kMDItemUserTags $yellow_orange_red animated_rainbow;
  rm -rf untitled*;
  osascript -e 'tell application "Finder" to delete (make new folder at (front window) with properties {name:"z"})' > ./unused/err.txt;

  xattr -wx com.apple.metadata:_kMDItemUserTags $green_yellow_orange animated_rainbow;
  echo dafs
  rm -rf untitled*;
  osascript -e 'tell application "Finder" to delete (make new folder at (front window) with properties {name:"z"})' > ./unused/err.txt;

  # xattr -wx com.apple.metadata:_kMDItemUserTags $blue_green_yellow animated_rainbow;
  # rm -rf untitled*;
  # osascript -e 'tell application "Finder" to delete (make new folder at (front window) with properties {name:"z"})' > ./unused/err.txt;
  # xattr -wx com.apple.metadata:_kMDItemUserTags $purple_blue_green animated_rainbow;
  # rm -rf untitled*;
  # osascript -e 'tell application "Finder" to delete (make new folder at (front window) with properties {name:"z"})' > ./unused/err.txt;

  # xattr -wx com.apple.metadata:_kMDItemUserTags $blank animated_rainbow;
  # rm -rf untitled*;
  # osascript -e 'tell application "Finder" to delete (make new folder at (front window) with properties {name:"z"})' > ./unused/err.txt;

# #loop
# for i in $(ls rainbow_frames/1_intro); do
#   # xattr -wx com.apple.metadata:_kMDItemUserTags $red_grey_purple animated_rainbow;
#   xattr -wx com.apple.metadata:_kMDItemUserTags \ "`xattr -px com.apple.metadata:_kMDItemUserTags ./rainbow_frames/1_intro/$i`" animated_rainbow;
#   rm -rf untitled*
#   osascript -e 'tell application "Finder" to delete (make new folder at (front window) with properties {name:"z"})' > ./unused/err.txt;
# done

# for ((n = 0; n < $loops; n++)); do
#   for i in $(ls rainbow_frames/2_loop); do
#     xattr -wx com.apple.metadata:_kMDItemUserTags \ "`xattr -px com.apple.metadata:_kMDItemUserTags ./rainbow_frames/2_loop/$i`" animated_rainbow;
#     rm -rf untitled*
#     osascript -e 'tell application "Finder" to delete (make new folder at (front window) with properties {name:"z"})' > ./unused/err.txt;
#   done
# done

# for i in $(ls rainbow_frames/3_outro); do
#   xattr -wx com.apple.metadata:_kMDItemUserTags \ "`xattr -px com.apple.metadata:_kMDItemUserTags ./rainbow_frames/3_outro/$i`" animated_rainbow;
#   rm -rf untitled*
#   osascript -e 'tell application "Finder" to delete (make new folder at (front window) with properties {name:"z"})' > ./unused/err.txt;
# done