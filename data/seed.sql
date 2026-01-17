CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS link_pages (
    id INTEGER PRIMARY KEY,
    displayname TEXT NOT NULL UNIQUE,
    bio TEXT,
    user_id INTEGER NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_link_page_user ON link_pages (user_id);

CREATE INDEX IF NOT EXISTS idx_link_page_displayname ON link_pages (displayname);

CREATE TABLE IF NOT EXISTS links (
    id TEXT PRIMARY KEY,
    page_id INTEGER NOT NULL,
    url TEXT NOT NULL,
    label TEXT NOT NULL,
    position INTEGER NOT NULL,
    click_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT current_timestamp,
    UNIQUE (page_id, url),
    UNIQUE (page_id, label),
    FOREIGN KEY (page_id) REFERENCES link_pages (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_links_page ON links (page_id);
