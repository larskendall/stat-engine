#!/usr/bin/env bash

export DATABASE_NAME=statengine_test

if ! [[ "$( psql -tAc "SELECT 1 FROM pg_database WHERE datname='$DATABASE_NAME'" )" = '1' ]]
then
    echo "Database '$DATABASE_NAME' does not exist. Creating..."
    createdb "$DATABASE_NAME"
    echo "Database '$DATABASE_NAME' created!"
fi
