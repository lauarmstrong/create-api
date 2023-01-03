# Storefront Backend Project

This project aims to build a RESTful JSON API for creating an online retail store.
This storefront backend is powered by a Postgres database to store products, users and orders.
This application implements password hashing and JWTs.

## Starter Code

Starter code provided by Udacity.

## Technologies used

This application makes use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Local setup

Add a .env file with the following variables:

POSTGRES_HOST=my-postgres
DB_PORT=3000
POSTGRES_DB = products_dev
POSTGRES_USER = postgres
POSTGRES_PASSWORD = password123
ENV = DEV
POSTGRES_TEST_DB = products_test
BCRYPT_PASSWORD = very-secret-password
SALT_ROUNDS = 10

## Database setup

To create the database, use psql to run: CREATE DATABASE products_dev;
To create the tables, run: yarn migrate

## Docker setup

In the .env file, change:

POSTGRES_HOST=127.0.0.1 POSTGRES_USER=postgres

run: docker build -t sql-express-products . and docker-compose up, then navigate to http://localhost:3000

## Starting the App

- Run yarn ; yarn start ; yarn watch
- navigate to http://localhost:3000
- Testing using yarn test
