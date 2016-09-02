#!/bin/bash

# PRE_PUSH="./.git/hooks/pre-push"
# if [ -e "$PRE_PUSH" ]
#     echo '*** evaluated pre-push variable'
# then

    touch ./.git/hooks/pre-push
    chmod 777 ./.git/hooks/pre-push
    echo '*** created file and changed permissions'

    echo "BRANCH=$(git rev-parse --abbrev-ref HEAD)

    echo '1'
    echo '$(git rev-parse --abbrev-ref HEAD)'
    echo '2'
    echo $(git rev-parse --abbrev-ref HEAD)
    echo '3'

      if [ 'master' == '$BRANCH' ]; then
        echo '***************************************'
        echo '*                                     *'
        echo '*  congrats on your push to master!   *'
        echo '*                                     *'
        echo '*      say something encouraging      *'
        echo '*          or clever here.            *'
        echo '*                                     *'
        echo '***************************************'
      fi" > ./.git/hooks/pre-push 
    echo '*** pretty sure this is writing the file everytime but eh at least maybe it will work'
# fi