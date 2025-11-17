import { Hono } from 'hono';

import { addTodo } from './addTodo.js';
import { deleteTodo } from './deleteTodo.js';
import { getTodos } from './getTodos.js';
import { updateTodo } from './updateTodo.js';

const todoRoutes = new Hono()

todoRoutes.get("/todos", getTodos)
    .post("/todos/create", addTodo)
    .put("/todos/update/:id", updateTodo)
    .delete("/todos/delete/:id", deleteTodo)

export default todoRoutes