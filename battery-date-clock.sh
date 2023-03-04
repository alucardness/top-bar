#!/bin/zsh

_BATTERY=$(pmset -g batt | grep -o '[0-9]*%; [a-z]*')
_DATE=$(date "+%a %m %d %Y %I:%M %p")
DATE_DAY=$(echo $_DATE | awk '{print $1}')
DATE_MONTH=$(echo $_DATE | awk '{print $2}')
DATE_NUMBER=$(echo $_DATE | awk '{print $3}')
DATE_CLOCK=$(echo $_DATE | grep -o '\d\{1,2\}:\d\{2\} [AP]M')
SONG_NAME=$(osascript top-bar/song_name.scpt)

# print the output in json format
printf '{
        "battery":"%s", 
        "date_day":"%s", 
        "date_number":"%s",
        "date_month":"%s", 
        "clock": "%s",
        "song_name": "%s"
}' "$_BATTERY" "$DATE_DAY" "$DATE_MONTH" "$DATE_NUMBER" "$DATE_CLOCK" "$SONG_NAME"