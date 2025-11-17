import type { Context } from "hono";
import { prisma } from '../../prisma/prisma.extended.js';

export const deleteTodo = async (c: Context) => {
    const id = c.req.param("id")

    if (!id || typeof id !== "string") return c.json({ message: "Todo id must be provided to delete." }, 400)
    const exists = await prisma.todos.findFirst({ where: { id } })
    if (!exists) return c.json({ message: "Todo not found or already deleted." }, 404)

    try {
        await prisma.todos.delete({ where: { id } })
        return c.json({ message: "Todo deleted successfully" }, 200)
    } catch (err) {
        console.error("Error on deleteTodo: ", err)
        return c.json({ message: "Unable to delete todos." }, 400)
    }
}