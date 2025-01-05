import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { authMiddleware } from "../middleware/authMiddleware";
import { userIdMiddleware } from "../middleware/userIdMiddleware";

export const bookmarkRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

bookmarkRouter.put("/", authMiddleware, userIdMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { blogId } = await c.req.json();
  const userId = c.get("userId");

  let alreadySaved;

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
    // check if there are existing bookmark
    const existingBookmark = await prisma.savedPost.findUnique({
      where: {
        userId_contentId: {
          contentId: blogId,
          userId: userId,
        },
      },
    });
    // console.log("exsitinglikes");

    // if existingBookmark is there then remove it
    if (existingBookmark?.id) {
      const deleteRow = await prisma.savedPost.delete({
        where: {
          id: existingBookmark.id,
        },
      });

      alreadySaved = false;

      return c.json(
        {
          success: true,
          existingBookmark: alreadySaved,
        },
        200
      );
    }

    // if not then add a bookmark
    const addBookmark = await prisma.savedPost.create({
      data: {
        contentId: blogId,
        userId: userId,
        saved: true,
      },
    });
    // console.log("added like");

    alreadySaved = true;

    return c.json(
      {
        success: true,
        existingBookmark: alreadySaved,
      },
      200
    );
  } catch (error) {
    console.error(error);
    return c.json(
      {
        success: false,
        message: "Something went wrong in Bookmarking",
      },
      403
    );
  }
});
