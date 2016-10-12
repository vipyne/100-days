#!/bin/bash

# this script "animates" color metatags in mac OSX finder windows
# usage: $ ./animate_the_rainbow.sh [path to file on which to animate colors] [number of animation loops]

# TODO / "FEATURES":
# stop "dropping frames"
# figure out how to display more than 3 color metatags

# shout outs
# http://nshipster.com/extended-file-attributes/
# http://arstechnica.com/apple/2013/10/os-x-10-9/9/

########################
###### HEX VALUES ######
########################

# to grab pure hex values
# $ ruby -e 'puts `xattr -px [com.your.metadataKey] [filename]`.to_s.gsub(" ","").gsub("\n","")'

# com.apple.metadata:_kMDItemUserTags
# com.apple.FinderInfo

red=62706C6973743030A101555265640A36080A0000000000000101000000000000000200000000000000000000000000000010;
red_finder=0000000000000000000C00000000000000000000000000000000000000000000;

orange_red=62706C6973743030A20102555265640A36584F72616E67650A37080B11000000000000010100000000000000030000000000000000000000000000001A;
orange_red_finder=0000000000000000000E00000000000000000000000000000000000000000000;

yellow_orange_red=62706C6973743030A3010203555265640A36584F72616E67650A375859656C6C6F770A35080C121B0000000000000101000000000000000400000000000000000000000000000024;
yellow_orange_red_finder=0000000000000000000A00000000000000000000000000000000000000000000;

green_yellow_orange=62706C6973743030A3010203584F72616E67650A375859656C6C6F770A3557477265656E0A32080C151E0000000000000101000000000000000400000000000000000000000000000026;
green_yellow_orange_finder=0000000000000000000400000000000000000000000000000000000000000000;

blue_green_yellow=62706C6973743030A30102035859656C6C6F770A3557477265656E0A3256426C75650A34080C151D0000000000000101000000000000000400000000000000000000000000000024;
blue_green_yellow_finder=0000000000000000000800000000000000000000000000000000000000000000;

purple_blue_green=62706C6973743030A301020357477265656E0A3256426C75650A3458507572706C650A33080C141B0000000000000101000000000000000400000000000000000000000000000024;
purple_blue_green_finder=0000000000000000000600000000000000000000000000000000000000000000;

grey_purple_blue=62706C6973743030A301020356426C75650A3458507572706C650A3356477261790A31080C131C0000000000000101000000000000000400000000000000000000000000000023;
grey_purple_blue_finder=0000000000000000000200000000000000000000000000000000000000000000;

red_grey_purple=62706C6973743030A301020358507572706C650A3356477261790A31555265640A36080C151C0000000000000101000000000000000400000000000000000000000000000022;
red_grey_purple_finder=0000000000000000000C00000000000000000000000000000000000000000000;

orange_red_grey=62706C6973743030A301020356477261790A31555265640A36584F72616E67650A37080C13190000000000000101000000000000000400000000000000000000000000000022;
orange_red_grey_finder=0000000000000000000E00000000000000000000000000000000000000000000;

grey_purple=62706C6973743030A2010258507572706C650A3356477261790A31080B14000000000000010100000000000000030000000000000000000000000000001B;
grey_purple_finder=0000000000000000000200000000000000000000000000000000000000000000;

grey=62706C6973743030A10156477261790A31080A0000000000000101000000000000000200000000000000000000000000000011;
grey_finder=0000000000000000000200000000000000000000000000000000000000000000;

########################
########################
########################


# color tag metadata array
intro=($red $red $orange_red $yellow_orange_red $green_yellow_orange $blue_green_yellow $purple_blue_green)
loop=($grey_purple_blue $red_grey_purple $orange_red_grey $yellow_orange_red $green_yellow_orange $blue_green_yellow $purple_blue_green)
outro=($grey_purple_blue $grey_purple $grey);

# finder metadata array
intro_finder=($red_finder $red_finder $orange_red_finder $yellow_orange_red_finder $green_yellow_orange_finder $blue_green_yellow_finder $purple_blue_green_finder)
loop_finder=($grey_purple_blue_finder $red_grey_purple_finder $orange_red_grey_finder $yellow_orange_red_finder $green_yellow_orange_finder $blue_green_yellow_finder $purple_blue_green_finder)
outro_finder=($grey_purple_blue_finder $grey_purple_finder $grey_finder);

# if path/to/file argument is invalid, animated this script file
if [ -f "$1" ]; then
 file_to_animate="$1";
else
  file_to_animate="$0"
fi

# if number of loops argument is invalid, animated this script file
number_regex='^[0-9]+$'
if [[ "$2" =~ $number_regex ]]; then
  loops="$2";
else
  loops=2;
fi

# clear all tags to start
xattr -c $file_to_animate; # blank
wait;
#intro
finder_i=0;
for i in "${intro[@]}"; do
  xattr -wx com.apple.FinderInfo "${intro_finder[$finder_i ]}" $file_to_animate;
  xattr -wx com.apple.metadata:_kMDItemUserTags "$i" $file_to_animate;
  let "finder_i = $finder_i + 1";
  osascript -e 'tell application "Finder" to delete (make new folder at (front window))' > ./unused/err.txt;
done
wait;
for loop_num in $loops; do
  finder_l=0
  for i in "${loop[@]}"; do
    xattr -wx com.apple.FinderInfo "${loop_finder[$finder_l ]}" $file_to_animate;
    xattr -wx com.apple.metadata:_kMDItemUserTags "$i" $file_to_animate;
    let "finder_l = $finder_l + 1";
    osascript -e 'tell application "Finder" to delete (make new folder at (front window))' > ./unused/err.txt;
  done
done
wait;
#outro
finder_o=0;
for i in "${outro[@]}"; do
  xattr -wx com.apple.FinderInfo "${outro_finder[$finder_o ]}" $file_to_animate;
  xattr -wx com.apple.metadata:_kMDItemUserTags "$i" $file_to_animate;
  let "finder_o = $finder_o + 1";
  osascript -e 'tell application "Finder" to delete (make new folder at (front window))' > ./unused/err.txt;
done
wait;
# clear all tags again
xattr -c $file_to_animate; # blank
osascript -e 'tell application "Finder" to delete (make new folder at (front window))' > ./unused/err.txt;
