import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { authMiddleware } from "../middleware/authMiddleware";
import { userIdMiddleware } from "../middleware/userIdMiddleware";
import { createBlogInput, updateBlogInput } from "@hitlerx100/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.post("/create", authMiddleware, userIdMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  // zod validation import from npm package hiterx100/medium-common
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not correct",
    });
  }

  const authorId = c.get("userId");

  try {
    // create post and each post will have authorId i.e id of the user creating post
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        description: body.description,
        authorId: authorId,
      },
    });

    c.status(200);
    return c.json({
      success: true,
      id: blog.id,
      message: "Post created successfully",
    });

    // console.log("response");

    // c.json("ok");
  } catch (error) {
    c.status(403);
    return c.json({
      success: false,
      message: "Something went wrong",
    });
  }
});

blogRouter.get("/all", authMiddleware, userIdMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.get("userId");

  try {
    // get all the post of the user by their author Id
    const blog = await prisma.post.findMany({
      where: {
        authorId: authorId,
      },
    });

    if (blog.length == 0) {
      c.status(200);
      return c.json({
        success: false,
        message: "No blogs exist",
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
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not correct",
    });
  }

  try {
    // check if user has entered correct blog id
    const checkIdExist = await prisma.post.findUnique({
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
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        description: body.description,
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

blogRouter.get("/:id/view", authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    // check if user has entered correct blog id
    const checkIdExist = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    if (!checkIdExist) {
      c.status(200);
      return c.json({
        success: false,
        message: "No such id exist",
      });
    }

    const blog = await prisma.post.findFirst({
      where: {
        id: id,
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
    c.status(200);
    return c.json({
      success: true,
      blog: blog,
    });
  } catch (error) {
    c.status(403);
    return c.json({
      success: false,
      message: "Something went wrong",
    });
  }
});

blogRouter.get("/view/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
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
    // console.log(allBlogs);
    c.status(200);
    return c.json({
      blogs: blogs.length > 0 ? blogs : "No blogs exist",
      totalBlogs: blogs.length,
    });
  } catch (error) {
    c.status(403);
    return c.json({
      success: false,
      message: "Something went wrong",
    });
  }
});
