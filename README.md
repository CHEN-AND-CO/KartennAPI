# Update System

```
sudo apt update
sudo apt -y install nano bash-completion wget
sudo apt -y upgrade
```

# Add Postgres 12 repo

```
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" |sudo tee  /etc/apt/sources.list.d/pgdg.list
```

# Install postgres 12

```
sudo apt update
sudo apt -y install postgresql-12 postgresql-client-12
```

# Install PostGis

```
sudo apt install postgresql-12-postgis-*
sudo apt install postgis*
```

# Change Postgres password

```sudo su - postgres```

```psql -c "alter user postgres with password 'chenco'"```

# Create database

```createdb mydatabase -O bevin```

```exit```

# Install postgis on database

```psql```

```
CREATE EXTENSION postgis; 
CREATE EXTENSION postgis_raster;
CREATE EXTENSION postgis_topology;
CREATE EXTENSION postgis_sfcgal;
CREATE EXTENSION fuzzystrmatch;
CREATE EXTENSION address_standardizer;
CREATE EXTENSION address_standardizer_data_us;
CREATE EXTENSION postgis_tiger_geocoder;
CREATE EXTENSION hstore;
```

# Install pgAdmin4

```
sudo apt update
sudo apt install pgadmin4 pgadmin4-apache2 -y
```

pgAdmin is now available on ```http://localhost/pgAdmin4```

# Get Britanny osm
```./query-overpass.sh '[timeout:96000];(area[name="Bretagne"][admin_level="4"];)->.a;(node(area.a);<;);out meta;'```
or
```wget 'http://overpass-api.de/api/interpreter?data=[timeout:3600];(area[name="Bretagne"][admin_level="4"];)->.a;(node(area.a);<;);out meta;' -O bretagne.osm```

# Get Finistère osm
```./query-overpass.sh '[timeout:96000];(area[name="Finistère"][admin_level="6"];)->.a;(node(area.a);<;);out meta;'```
or
```wget 'http://overpass-api.de/api/interpreter?data=[timeout:7200];(area[name="Finistère"][admin_level="6"];)->.a;(node(area.a);<;);out meta;' -O finistere.osm```

# install osm2pgsql

```sudo apt install osm2pgsql```

# Add osm into database
### First file
``` 
osm2pgsql finistere.osm -d ohmybzh -U admin --hstore --slim
```
### Others
```
osm2pgsql morbihan.osm -d ohmybzh -U admin --hstore --slim --append
```
