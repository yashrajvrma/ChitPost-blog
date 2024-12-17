import { MiddlewareHandler } from "hono";
import { verify } from "hono/jwt";
import { HTTPException } from "hono/http-exception";

export const userIdMiddleware: MiddlewareHandler<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}> = async (c, next) => {
  const header = c.req.header("Authorization");
  const token = header?.split(" ")[1];
  if (!token) {
    throw new HTTPException(403, {
      message: "You are unauthorized",
    });
  }

  try {
    const user = await verify(token, c.env.JWT_SECRET);

    console.log(user);

    if (user && typeof user.id === "string") {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are unauthorized",
      });
    }
  } catch (error) {
    console.log(error);

    return c.json({
      message: "Something went wrong",
    });
  }
};
