# Project Name :

NC News Seeding

# Project Summary: 
 
 In the Northcoder News Server project the main goal is to build a RESTful API using Node.js and Express to interact with a PostgreSQL database. Implement endpoints to manage articles, topics, comments, and users, including CRUD operations. Support query features like sorting, filtering, pagination, and comment counts. Document the API with a static /api endpoint and provide a professional, maintainable codebase. 

# Create .env files to setup database:

- Create .env.development file in the project root directory and add database name of development by using the below code

PGDATABASE=your_development_database

- Create .env.test file in the project root directory and add database name of test by using the below code

PGDATABASE=your_test_database

- Create a .env.production file in the project root directory and add the database connection string by using the below command:

DATABASE_URL="your-production-database-connection-string"

# Link of the hosted version: 

We can check the necessary APIs by going to the below URL:

https://seeding-nc-news-097y.onrender.com



# How to clone:

- Go to the project repository https://github.com/fariahasan36/seeding-nc-news
- Click code and copy the url to clipboard
- Open a terminal and then type the below command and then click enter, it will clone into your PC.
    
    git clone https://github.com/fariahasan36/seeding-nc-news

# Install dependencies: 

- To install necessary dependencies listed in package.json use the command `npm install` in the project root directory 
- To install dev dependencies listed in package.json use the command `npm install --save-dev` in the project root directory 

# Run the scripts:

- After installation, we can run the scripts by below command:
- To create database in dev and test env run 

npm run setup-dbs

- To seed the dev data in local environment and then run the project by below command:

npm run seed-dev
npm start

- To test the data in local environment run the project by below command:

npm run test

- To seed the data in production database environment run the project by below command:

npm run seed-prod

# Minimum version to run Nodejs and Postgres:

- Node.js (Minimum Version: v12)
- PostgreSQL (Minimum Version v12)