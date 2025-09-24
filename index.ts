import { Hono } from 'hono'
import home from "./src/content/home";

const app = new Hono()

app.get('/', (c) => {
    return c.text(home, 200, {
        "Content-Type": "text/markdown",
    })
})

export default app