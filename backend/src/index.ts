import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { favRouter } from "./routes/favourite";
import { cors } from "hono/cors";
import { bookmarkRouter } from "./routes/bookmark";

// All the env variable should be binded in the hono app declaration as a key binding
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use(cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/post", blogRouter);
app.route("/api/v1/fav", favRouter);
app.route("/api/v1/save", bookmarkRouter);

export default app;
