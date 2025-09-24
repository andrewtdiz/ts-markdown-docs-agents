import { file, serve } from "bun";
import home from "./src/content/home.ts";

const server = serve({
  routes: {
    "/health": {
      async GET(req) {
        return Response.json({
          message: "OK",
        });
      },
    },
  },
  fetch: (req) => {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      return new Response(home, {
        headers: {
          "Content-Type": "text/markdown",
        },
      });
    }
    return fetch(req);
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
