CREATE TABLE IF NOT EXISTS equipment (
  id         SERIAL        PRIMARY KEY,
  name       VARCHAR(255)  NOT NULL,
  type       VARCHAR(100)  NOT NULL,
  make       VARCHAR(100)  NOT NULL,
  model      VARCHAR(100)  NOT NULL,
  tag        VARCHAR(100)  NOT NULL UNIQUE,
  location   VARCHAR(255)  NOT NULL,
  status     VARCHAR(50)   NOT NULL DEFAULT 'active',
  created_at TIMESTAMP     NOT NULL DEFAULT NOW()
);