CREATE TABLE order_products (
    id SERIAL PRIMARY  KEY,
    user_id integer REFERENCES users(id),
    product_id bigint REFERENCES products(id),
    quantity integer,
);