CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    displayname TEXT NOT NULL UNIQUE,
    bio TEXT,
    profile_completed INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT current_timestamp
);

CREATE INDEX IF NOT EXISTS idx_users_displayname ON users (displayname);

CREATE TABLE IF NOT EXISTS links (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    url TEXT NOT NULL,
    label TEXT NOT NULL,
    position INTEGER NOT NULL,
    click_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT current_timestamp,
    UNIQUE (user_id, url),
    UNIQUE (user_id, label),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_links_user ON links (user_id);
