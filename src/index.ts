import { Hono } from 'hono'
import home from "./content/home.ts";

const app = new Hono()

app.get('/', (c) => {
    return c.text(home, 200, {
        "Content-Type": "text/markdown",
    })
})

export default app