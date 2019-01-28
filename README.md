# vue-calculator
Simple calculator written with Vue.js and using PostgREST server for API calls 

## Features

* input by clicking virtual keyboard buttons
* input by typing on input field
* percentage calculation
* sync operations history by REST API 

## Getting Started

### Prerequisites

* Linux based OS
* Postgres SQL server
* yarn package manager

### Installing

Install all project dependencies

```
yarn install
```

Download the latest release from [official site](https://github.com/PostgREST/postgrest/releases/tag/v5.2.0)

Install PostgREST

```
mkdir ./bin
cd ./bin/
tar xfJ postgrest-<version>-<platform>.tar.xz
```

Connect to your database as postgres user

```
env PGPASSWORD=<YOUR_PASSWORD> psql -U postgres
```

Execute following commands

```
CREATE USER calc PASSWORD 'calcpasswd';
CREATE DATABASE calc OWNER = calc;
CREATE ROLE web_anon NOLOGIN;
GRANT web_anon TO calc;

\c calc;

CREATE SCHEMA api;
CREATE TABLE api.history (
  id SERIAL PRIMARY KEY,
  expression VARCHAR(512),
  result FLOAT,
  created_at TIMESTAMPTZ DEFAULT(NOW())
);
GRANT ALL ON SCHEMA api TO web_anon;
GRANT ALL ON api.history TO web_anon;
GRANT USAGE, SELECT ON SEQUENCE api.history_id_seq TO web_anon;

```

Run REST Api server from project's directory
```
./bin/postgrest ./api.conf
``` 

Start project
```
yarn run serve
```


## Console commands

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

## Built With

* [Vue.js](https://ru.vuejs.org) - The web framework used
* [PostgREST](http://postgrest.org) - API server

## Authors

* **Buzykin Mikhail**
