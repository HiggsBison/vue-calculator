# calculator

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### REST API integration 


CREATE DATABASE calc OWNER = calc;
CREATE USER calc PASSWORD 'calcpasswd';
CREATE ROLE web_anon NOLOGIN;
GRANT web_anon TO calc;

\c calc;

CREATE SCHEMA api;
CREATE ROLE web_anon NOLOGIN;
CREATE TABLE api.history (
  id SERIAL PRIMARY KEY,
  expression VARCHAR(512),
  result FLOAT,
  created_at TIMESTAMPTZ
);
GRANT USAGE ON SCHEMA api TO web_anon;
GRANT SELECT ON api.history TO web_anon;
