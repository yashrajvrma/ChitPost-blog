import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { authMiddleware } from "../middleware/authMiddleware";
import { userIdMiddleware } from "../middleware/userIdMiddleware";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// blogRouter.post("/create", authMiddleware, userIdMiddleware, async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   // const body = await c.req.json();
//   // // zod validation import from npm package hiterx100/medium-common
//   // const { success } = createBlogInput.safeParse(body);
//   // if (!success) {
//   //   c.status(411);
//   //   return c.json({
//   //     message: "Inputs are not correct",
//   //   });
//   // }

//   const authorId = c.get("userId");

//   try {
//     // create post and each post will have authorId i.e id of the user creating post
//     const blog = await prisma.post.create({
//       data: {
//         content :
//         authorId: authorId,
//       },
//     });

//     c.status(200);
//     return c.json({
//       success: true,
//       id: blog.id,
//       message: "Post created successfully",
//     });

//     // console.log("response");

//     // c.json("ok");
//   } catch (error) {
//     c.status(403);
//     return c.json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// });

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

blogRouter.get("/:id/view", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    // check if user has entered correct blog id
    const checkIdExist = await prisma.content.findUnique({
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

    const blog = await prisma.content.findFirst({
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
   
    if (!blog) {
      return c.json({ error: "Post not found" }, 404);
    }

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

// blogRouter.get("/view/bulk", async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   const param = c.req.param("page");

//   try {
//     const blogs = await prisma.content.findMany({
//       include: {
//         author: {
//           select: {
//             firstName: true,
//             lastName: true,
//             profileColor: true,
//           },
//         },
//       },
//     });
//     // console.log(allBlogs);
//     c.status(200);
//     return c.json({
//       blogs: blogs.length > 0 ? blogs : "No blogs exist",
//       totalBlogs: blogs.length,
//     });
//   } catch (error) {
//     c.status(403);
//     return c.json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// });

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
