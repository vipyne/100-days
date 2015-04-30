#!/bin/bash

PRE_PUSH="./.git/hooks/pre-push"
if [ ! -s "$PRE_PUSH" ]
then
echo '*** creating pre push git hook'
echo '*** aka looky looky i got hooky'

touch ./.git/hooks/pre-push
chmod 777 ./.git/hooks/pre-push

echo "if [ 'master' == \$(git rev-parse --abbrev-ref HEAD) ]; then
        echo '***************************************'
        echo '*                                     *'
        echo '*  congrats on your push to master!   *'
        echo '*                                     *'
        echo '*      say something encouraging      *'
        echo '*          or clever here.            *'
        echo '*                                     *'
        echo '***************************************'
      fi" > ./.git/hooks/pre-push 
fi