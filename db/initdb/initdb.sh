#!/bin/bash
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

exit_status=1
count=0
timeout=120

until mongo --eval "print(\"waited for connection\")"
  do
    sleep 5
    count=$[$count + 5]

    if [ "$count" -ge "$timeout" ]; then
        echo "Error: Mongo server failed to start up after $timeout seconds."
        exit 1
    fi
  done

echo "========== MONGO_DB SERVER SUCCESSFULLY STARTED ==========" | tee -a /var/opt/initdb/log/initdb.log

bash "${__dir}/initdb-database.sh" "$@"
bash "${__dir}/initdb-users.sh" "$@"
bash "${__dir}/initdb-data.sh" "$@"

echo "========== DATABASE SUCCESSFULLY INITIALIZED ==========" | tee -a /var/opt/initdb/log/initdb.log

cd "${__dir}"
