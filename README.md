# Node TODO API

## Using the API server

To install an run the node API server:

1. Clone this project:
```
https://github.com/lcnogueira/node-todo-api.git
```

2. Install the dependencies:
```
cd node-todo-api/
npm install
```

3. Install and run a MongoDB server locally (if it's the case), and create 2 Mongo Databases: `TodoApp` and `TodoAppTest`.

4. If you are running it locally, create a `config.json` file inside `server/config` folder, like this:
```
{
  "test": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:27017/TodoAppTest",
    "JWT_SECRET": "<secret>"
  },
  "development": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:27017/TodoApp",
    "JWT_SECRET": "<secret>"
  }
}
```
P.S.: Replace the `<secret>` with the secret you wish to use to sign the Json Web Token.

5. If it is hosted on a web server, make sure that:

* There is a `process.env.NODE_ENV` set to `production` 
* There is a `process.env.JWT_SECRET` set;
* There is a `process.env.MONGODB_URI` set;
* There is a `process.env.PORT` set.

For example, on heroku, you can do so by using `heroku config:set` command. By default, the `PORT` environment variable already exists on heroku.

6. Run `npm start`.

P.S.: To run the tests, use `npm test` or `npm test-watch`.

## API Endpoint

The following endpoints are available:

| Endpoints       | Usage          | Needs authentication | Params         |
|-----------------|----------------|----------------|----------------|
| `GET /todos` | Get all of the todos for a particular user. | Yes | |
| `GET /todos/:id` | Get a specific todo. | Yes |  |
| `POST /todos` | Add a new todo. | Yes | **text** - [String] |
| `DELETE /todos/:id` | Delete a specific todo. | Yes |  |
| `PATCH /todos/:id` | Update a specific todo. | Yes | **text** - [String] <br> **completed** [Boolean] |
| `GET /users/me` | Return the data of the logged in user. | Yes | |
| `POST /users` | Create a new user and returns a token. | No | **email** - [String] <br> **password** - [String] |
| `POST /users/login` | Authenticate a user and returns a token. | No | **email** - [String] <br> **password** - [String] |
| `DELETE /users/me/token` | Logout a user.  | Yes | &nbsp; |
