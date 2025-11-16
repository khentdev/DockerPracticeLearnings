import { Hono } from 'hono';

import * as todo from './controller/index.controller.js';

const { getTodos, deleteTodo, addTodo, updateTodo } = todo

const todoRoutes = new Hono()
todoRoutes.get("/todos", getTodos)
    .post("/todos/create", addTodo)
    .delete("todos/delete/:id", deleteTodo)
    .put("/todos/update/:id", updateTodo)

export default todoRoutes
