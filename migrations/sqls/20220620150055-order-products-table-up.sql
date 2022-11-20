CREATE TABLE order_products (
    id SERIAL PRIMARY  KEY,
    -- user_id integer REFERENCES users(id),
    order_id integer REFERENCES orders(id),
    product_id bigint REFERENCES products(id),
    quantity integer,
);