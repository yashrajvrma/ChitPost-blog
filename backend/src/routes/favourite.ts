import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { authMiddleware } from "../middleware/authMiddleware";
import { userIdMiddleware } from "../middleware/userIdMiddleware";

export const favRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

favRouter.put("/", authMiddleware, userIdMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // const body = await c.req.json();
  const id = c.req.query("id");

  const userId = c.get("userId");

  console.log("in");

  if (!id || !userId) {
    return c.json(
      {
        success: false,
        message: "Content ID and User ID are required.",
      },
      400
    );
  }

  try {
    // check if there are existing likes
    const existingLikes = await prisma.favourite.findFirst({
      where: {
        userId: userId,
        contentId: id,
      },
    });
    console.log("exsitinglikes");
    // if not then add a like
    if (!existingLikes) {
      const like = await prisma.favourite.create({
        data: {
          contentId: id as string,
          userId: userId,
          status: true,
        },
      });
    } else {
      // if there then it would be a like so delete it because user want to remove his like
      const deleteRow = await prisma.favourite.delete({
        where: {
          id: existingLikes?.id,
        },
      });
    }

    const totalLikes = await prisma.favourite.count({
      where: {
        contentId: id,
      },
    });

    return c.json(
      {
        success: true,
        totalLikes: totalLikes,
      },
      200
    );
  } catch (error) {
    console.error(error);
    return c.json(
      {
        success: false,
        message: "Something went wrong",
      },
      403
    );
  }
});
