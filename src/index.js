const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];
const todos = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const account = users.find((user) => user.username === username);
  if (!account) {
    return response.status(401).json({ error: "Account is not exists!" });
  }
  request.user = account;

  next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;
  const userAlreadyExists = users.some((user) => user.username === username);
  if (userAlreadyExists) {
    return response.status(400).json({ error: "User already exists" });
  }
  const createUserOperation = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  };
  users.push(createUserOperation);
  return response.status(201).json(createUserOperation);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  return response.status(200).json(todos);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;

  const createTodoOperation = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };
  todos.push(createTodoOperation);

  return response.status(201).json(createTodoOperation);
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
