#!/bin/sh

echo "Creating dev and test databases"

createdb -U ${POSTGRES_USER} ${DB_NAME}
createdb -U ${POSTGRES_USER} ${DB_NAME}_test
