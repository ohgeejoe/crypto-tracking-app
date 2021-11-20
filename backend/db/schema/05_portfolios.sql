DROP TABLE IF EXISTS portfolios CASCADE;

CREATE TABLE portfolios (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  total_balance REAL NOT NULL DEFAULT 0
);