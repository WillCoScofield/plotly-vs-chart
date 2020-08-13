#!/bin/bash

# This is a static data we are importing strictly for development purpose,
# so we will just recreate the database in lieu of a slow upsert operation
mongo <<EOF
use fcm
db.dropDatabase()
EOF

mongoimport --db fcm --collection facilities --file /opt/initdb/data/V1.0__Initial_data_fcm_facilities.json

mongo <<EOF
use fcm
db.facilities.createIndex(
  { risk_group_num: 1 },
  { name: "index for risk_group_num" }
);
db.facilities.createIndex(
  { npi: 1 },
  { name: "index for npi" }
);
EOF
