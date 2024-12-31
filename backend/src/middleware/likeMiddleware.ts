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
    existingLike: Boolean;
  };
}> = async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const header = c.req.header("Authorization");
  const token = header?.split(" ")[1];

  const id = c.req.query("id");

  // check if the token exist in the header
  //   if (!token) {
  //     throw new HTTPException(401, {
  //       message: "You are unauthorized",
  //     });
  //   }

  if (!token) {
    await next();
  }
  try {
    const response = await verify(token as string, c.env.JWT_SECRET);

    // check the response id with the user id
    if (!response.id) {
      c.status(403);
      return c.json({
        success: false,
        message: "Invalid access token",
      });
    }

    const existingLikes = await prisma.favourite.findFirst({
      where: {
        userId: response.id,
        contentId: id,
      },
    });

    if (existingLikes) {
      c.set("existingLike", true);
      await next();
    } else {
      c.set("existingLike", false);
      await next();
    }

    // await next();
  } catch (error) {
    console.log(error);

    throw new HTTPException(403, {
      message: "You are unauthorized",
    });
  }
};
