import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { authMiddleware } from "../middleware/authMiddleware";
import { userIdMiddleware } from "../middleware/userIdMiddleware";
import { likeMiddleware } from "../middleware/likeMiddleware";

export const favRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

favRouter.put("/", likeMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { blogId } = await c.req.json();
  const userId = c.get("userId");

  console.log("inside");
  let alreadyLike;

  // return if there is no id in body
  if (!blogId) {
    return c.json(
      {
        success: false,
        message: "Pls send blog Id",
      },
      404
    );
  }

  try {
    // check if there are existing likes
    const existingLikes = await prisma.favourite.findUnique({
      where: {
        userId_contentId: {
          contentId: blogId,
          userId: userId,
        },
      },
    });
    console.log("exsitinglikes");

    // if there then it would be a like so delete it because user want to remove his like

    if (existingLikes?.id) {
      const deleteRow = await prisma.favourite.delete({
        where: {
          id: existingLikes.id,
        },
      });
      console.log("deleted");

      alreadyLike = false;

      const totalLikes = await prisma.favourite.count({
        where: {
          contentId: blogId,
        },
      });

      return c.json(
        {
          success: true,
          existingLikes: alreadyLike,
          totalLikes: totalLikes,
        },
        200
      );
    }

    // if not then add a like
    const addLike = await prisma.favourite.create({
      data: {
        contentId: blogId,
        userId: userId,
        status: true,
      },
    });
    console.log("added like");

    alreadyLike = true;

    const totalLikes = await prisma.favourite.count({
      where: {
        contentId: blogId,
      },
    });

    return c.json(
      {
        success: true,
        existingLikes: alreadyLike,
        totalLikes: totalLikes,
      },
      200
    );
  } catch (error) {
    console.error(error);
    return c.json(
      {
        success: false,
        message: "Something went wrong in fav",
      },
      403
    );
  }
});
