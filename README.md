# My Multi-Million Dollar Ideas App
![Page Example](/src/public/img/Page-example.png)
A website made for storing all your multi-million dollar ideas.

## Overview
### Users should be able to
- Register an account.
- Access the webpage by logging in (previous registration is required).
- Create an idea.
- Edit an idea.
- Delete an idea.
- Log out.
- Interact with the REST API of the app (check `./src/routes/api.js`). 

### Built with
Node JS, Express JS, Handlebars, SQL, Postman & CSS.

### What I learnt
- How to integrate a database with SQL into an app to store data and manipulate it.
- Create a functional HTTP server with Node JS & Express JS.
- Utilize Bootstrap for the styling of the page.
- Authenticate a user with passport.js.
- Encrypt passwords with bcrypt.js.
- Create a REST API with Express JS & Postman.

## Local Setup
```bash
    npm init
    npm run dev
```

## REST API
When the server of the APP receives API requests, it sends JSON objects. 

Here are the multiple requests that can be made to the app's REST API:
#### Users requests
- **Get**: Get all users (path: `./api/users`).
- **Get**: Get a speceific user by its username (path: `/api/users/:username`).
- **Post**: Create a user (path: `/api/users`).
- **Put**: Update a user (path: `/api/users/:username`).
- **Delete**: Delete a user (path: `/api/users/:username`).

#### Ideas requests
- **Get**: Get all ideas (path: `/api/ideas`).
- **Get**: Get all ideas from a specific user (path: `/api/ideas/:username`).
- **Get**: Get an idea by id (path: `/api/ideas/:username/:id`).
- **Post**: Create an idea (path: `/api/ideas`).
- **Put**: Update an idea (path: `/api/ideas/:id`).
- **Delete**: Delete an idea (path: `/api/ideas/:id`).

## Database
For creating the project's DB, use the MySQL commands that can be found on `/database/db.sql`.