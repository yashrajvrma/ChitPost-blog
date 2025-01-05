import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { HTTPException } from "hono/http-exception";
import { verify } from "hono/jwt";
import { MiddlewareHandler } from "hono";

export const likeMiddleware: MiddlewareHandler<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    existingLike: boolean;
  };
}> = async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const header = c.req.header("Authorization");
  const token = header?.split(" ")[1];

  // If the Authorization header or token is missing, proceed to the next middleware
  if (!header || !token) {
    await next();
    return;
  }

  try {
    const user = await verify(token, c.env.JWT_SECRET);

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
    console.error(error);

    throw new HTTPException(403, {
      message: "Invalid or expired token",
    });
  }
};
