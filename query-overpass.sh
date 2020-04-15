#!/bin/bash

# Query Overpass API (https://wiki.openstreetmap.org/wiki/Overpass_API)
# Usage:
# ```sh
# echo "[out:json];(way(109849152); node(1985407312);); out;" | ./query-overpass.sh
# ```

curl -d @- -X POST http://overpass-api.de/api/interpreter
