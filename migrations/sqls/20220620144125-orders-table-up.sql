CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    timestamp datetime NOT NULL,
    user_id integer REFERENCES users(id),
    status VARCHAR(15)
);