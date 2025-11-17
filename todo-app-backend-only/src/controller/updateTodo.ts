import type { Context } from "hono";
import { prisma } from "../../prisma/prisma.extended.js";

type UpdateTodoParams = {
    title: string, notes?: string
}
export const updateTodo = async (c: Context) => {
    const id = c.req.param("id")
    const { title, notes } = await c.req.json<UpdateTodoParams>()

    if (!id || typeof id !== "string") return c.json({ message: "Todo id must be provided to update." }, 400)
    if (!title || typeof title !== "string") return c.json({ message: "Title is required." }, 400)
    if (title && title.trim().length > 100) return c.json({ message: "Title must be less than or equal to 100 characters." }, 400)

    const exists = await prisma.todos.findFirst({ where: { id } })
    if (!exists) return c.json({ message: "Todo not found or already deleted." }, 404)

    if (notes && typeof notes !== "string") return c.json({ message: "Type of notes must be a typeof string." }, 400)
    if (notes && notes.trim().length >= 150) return c.json({ message: "Notes must be less than or equal 150 characters." }, 400)

    try {
        await prisma.todos.update({ where: { id }, data: { title, notes: notes ?? null } })
        return c.json({ message: "Todo updated successfully" }, 200)
    } catch (err) {
        console.error("Error on updateTodo: ", err)
        return c.json({ message: "Unable to update todos." }, 400)
    }
}