#!/bin/bash

branch=$(git rev-parse --abbrev-ref HEAD)

  if [ "master" == "$branch" ]; then
    echo '***************************************'
    echo '*                                     *'
    echo '*  congrats on your push to master!   *'
    echo '*                                     *'
    echo '*      say something encouraging      *'
    echo '*          or clever here.            *'
    echo '*                                     *'
    echo '***************************************'
  fi
