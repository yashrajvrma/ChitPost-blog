import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { authMiddleware } from "../middleware/authMiddleware";
import { userIdMiddleware } from "../middleware/userIdMiddleware";
import { likeMiddleware } from "../middleware/likeMiddleware";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.get("/all", authMiddleware, userIdMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.get("userId");

  try {
    // get all the post of the user by their author Id
    const blog = await prisma.content.findMany({
      where: {
        authorId: authorId,
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            profileColor: true,
          },
        },
      },
    });

    if (blog.length === 0) {
      c.status(200);
      return c.json({
        success: false,
        message: "No blogs exist",
        totalBlogs: blog.length,
      });
    }

    c.status(200);
    return c.json({
      success: true,
      data: blog,
      totalBlogs: blog.length,
    });
  } catch (error) {
    c.status(403);
    return c.json({
      success: false,
      message: "Something went wrong",
    });
  }
});

blogRouter.put("/update", authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  // zod validation import from npm package hiterx100/medium-common
  // const { success } = updateBlogInput.safeParse(body);
  // if (!success) {
  //   c.status(411);
  //   return c.json({
  //     message: "Inputs are not correct",
  //   });
  // }

  try {
    // check if user has entered correct blog id
    const checkIdExist = await prisma.content.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!checkIdExist) {
      c.status(200);
      return c.json({
        success: false,
        message: "No such id exist",
      });
    }
    const blog = await prisma.content.update({
      where: {
        id: body.id,
      },
      data: {
        content: body.content,
      },
    });
    c.status(200);
    return c.json({
      success: true,
      blog: blog,
      message: "Post updated successfully",
    });
  } catch (error) {
    c.status(403);
    return c.json({
      success: false,
      message: "Something went wrong",
    });
  }
});

blogRouter.get("/:id/view", likeMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogId = c.req.param("id");
  const userId = c.get("userId");

  // return if there is some blog with the id in params
  if (!blogId) {
    return c.json(
      {
        success: false,
        message: "Enter blog id",
      },
      404
    );
  }

  // return total likes on post if user is unauthorized
  if (!userId) {
    try {
      // check if user has entered correct blog id
      const checkIdExist = await prisma.content.findUnique({
        where: {
          id: blogId,
        },
      });

      if (!checkIdExist) {
        c.status(200);
        return c.json({
          success: false,
          message: "No such id exist",
        });
      }

      const blog = await prisma.content.findFirst({
        where: {
          id: blogId,
        },
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              profileColor: true,
            },
          },
        },
      });

      if (!blog) {
        return c.json({ error: "Post not found" }, 404);
      }

      const totalLikes = await prisma.favourite.count({
        where: {
          contentId: blogId,
        },
      });

      c.status(200);
      return c.json({
        success: true,
        blog: blog,
        totalLikes: totalLikes,
      });
    } catch (error) {}
  }

  try {
    // if user has userId , he is authorized
    // check if user has entered correct blog id
    const checkIdExist = await prisma.content.findUnique({
      where: {
        id: blogId,
      },
    });

    if (!checkIdExist) {
      c.status(200);
      return c.json({
        success: false,
        message: "No such id exist",
      });
    }

    const blog = await prisma.content.findFirst({
      where: {
        id: blogId,
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            profileColor: true,
          },
        },
      },
    });

    if (!blog) {
      return c.json({ error: "Post not found" }, 404);
    }
    const exsitinglikes = await prisma.favourite.findFirst({
      where: {
        contentId: blogId,
        userId: userId,
      },
    });

    const totalLikes = await prisma.favourite.count({
      where: {
        contentId: blogId,
      },
    });

    c.status(200);
    return c.json({
      success: true,
      blog: blog,
      existingLike: exsitinglikes ? true : false,
      totalLikes: totalLikes,
    });
  } catch (error) {
    c.status(403);
    return c.json({
      success: false,
      message: "Something went wrong",
    });
  }
});

blogRouter.post("/publish", authMiddleware, userIdMiddleware, async (c) => {
  // console.log("post request found");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Safely retrieve content and parse it
  const { content } = await c.req.json();
  if (!content) {
    return c.json({ success: false, message: "Content is required" }, 400);
  }

  // Proceed to parse content if it exists
  // const parsedJson = html2json.html2json(content);
  const authorId = c.get("userId");

  try {
    const createBlog = await prisma.content.create({
      data: {
        content: content,
        authorId: authorId,
      },
    });
    return c.json(
      {
        success: true,
        id: createBlog.id,
        post: content,
        message: "Post created successfully",
      },
      200
    );
  } catch (error) {
    console.error("Error during post creation:", error);
    return c.json(
      {
        success: false,
        message: "Something went wrong",
      },
      403
    );
  }
});

blogRouter.get("/view/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Get the 'take' parameter from the query (optional)
  const takeParam = Number(c.req.query("take"));
  const take = takeParam > 0 ? takeParam : undefined; // If 'take' is positive, use it, otherwise return all blogs

  try {
    const blogs = await prisma.content.findMany({
      take: take, // Apply the limit if 'take' is provided, otherwise return all blogs
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            profileColor: true,
          },
        },
      },
    });

    c.status(200);
    return c.json({
      blogs: blogs.length > 0 ? blogs : "No blogs exist",
    });
  } catch (error) {
    c.status(403);
    return c.json({
      success: false,
      message: "Something went wrong",
    });
  }
});
