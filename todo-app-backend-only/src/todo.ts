import { randomUUID } from "crypto";
import type { Context } from "hono";
type Todos = {
    id: string,
    title: string,
}
const dummyTodos: Todos[] = [
    {
        id: randomUUID(),
        title: "Workout later at 6pm"
    },
    {
        id: randomUUID(),
        title: "Buy a brand new computer"
    },
    {
        id: randomUUID(),
        title: "Clean my bedroom"
    }]
let Todos: Todos[] = []

dummyTodos.forEach((d) => {
    Todos.push(d)
})

export const getTodos = (c: Context) =>
    c.json({ message: "Todos fetched successfully.", data: Todos }, 200)


export const addTodo = async (c: Context) => {
    const { title } = await c.req.json<{ title: string }>()
    if (typeof title !== "string") return c.json({ error: { message: "Title type is invalid." } }, 400)

    const payload = { id: randomUUID(), title }
    Todos.push(payload)

    return c.json({ message: "Todo added successfully.", data: Todos.find(d => d.id === payload.id) }, 200)
}

export const updateTodo = async (c: Context) => {
    const id = c.req.param("id")
    const { title } = await c.req.json<Todos>()

    if (!id || !title) return c.json({ error: { message: "Todo 'id' or 'title' must be provided to update." } }, 400)

    if (typeof id !== "string" || typeof title !== "string") return c.json({ error: { message: "Todo 'id' or 'title' must be a type of string." } }, 400)

    const payload = { id, title }
    const toBeUpdated = Todos.find(d => d.id === payload.id)
    if (!toBeUpdated) return c.json({ message: "The todo to be update is not found. Please create new one." }, 404)

    Object.assign(toBeUpdated, payload)
    return c.json({ message: "Todo updated successfully.", Todos }, 200)
}

export const deleteTodo = async (c: Context) => {
    const id = c.req.param("id")
    if (!id) return c.json({ error: { message: "Todo 'id' must be provided to delete." } }, 400)

    const todoToDelete = Todos.findIndex(d => d.id === id)
    if (todoToDelete === -1)
        return c.json({ error: { message: "Looks like the todo you are trying to delete is not found." } }, 404)

    Todos.splice(todoToDelete, 1)
    return c.json({ message: "Todo deleted successfully.", Todos }, 200)
}

