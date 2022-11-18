# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show
- Create [token required]
- Destroy

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]
- Update
- Destroy
- Authenticate

#### Orders

- Index
- Show
- Create [token required]
- Destroy
- AddProduct

## Data Shapes

#### Product

- id
- name
- price
- imageUrl
- productcode

#### User

- id
- username
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
- timestamp of order

## Database Schema

- users (id: SERIAL PRIMARY KEY, username: VARCHAR(150), password: VARCHAR(150))
- products (id: SERIAL PRIMARY KEY, name: VARCHAR(150), price: integer, productCode: VARCHAR(300), imageUrl: VARCHAR(800))
- orders (id: SERIAL PRIMARY KEY, timestamp: DATE, user_id: INTEGER [foreign key to users table], status: VARCHAR(15))
- order_products (order_id: INTEGER REFERENCES orders(id), product_id: INTEGER REFERENCES products(id), quantity: INTEGER)

## Endpoints

###Orders

'/orders' [GET]

- Shows all orders in the DB
  '/orders' [POST]
- Creates a new order
- { "name": "jumper", "price": "10", "imageUrl": "www.image.com", "productCode": "123" }
  '/orders/:id' [GET]
- Shows a specific order
  '/orders/:id' [DELETE]
- Deletes a specific order
  '/orders/:id/products [POST]
- Adds a product to an order
- { "productId": "1", quantity: "10" }

### Users

'/users' [GET]

- Shows all users in the DB
  '/users' [POST]
- Creates a new user
- { "username": "someone", "password": "top-secret" }
  '/users/:id' [GET]
- Shows a specific user
  '/users/:id' [DELETE]
- Deletes a specific user
  '/authenticate' [POST]
- Authenticates a user
- { "username": "someone", "password": "top-secret" }

### Products

'/products' [GET]

- Shows all products in the DB
  '/products' [POST]
- Creates a new product
- { "name": "skipping rope", "price": "2", "imageUrl": "www.skiprope.com", "productCode": "5" }
  '/products/:id' [GET]
- Shows a specific product
  '/products/:id' [DELETE]
- Deletes a specific product
