CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT current_timestamp,
    displayname TEXT NOT NULL UNIQUE
);

CREATE INDEX IF NOT EXISTS idx_users_displayname ON users (displayname);
