import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";
import { signupInput, signinInput } from "@hitlerx100/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  // sjsj
  // zod validation import from npm package hiterx100/medium-common
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not correct",
    });
  }

  try {
    // Hash the password before storing it using bcrypt
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashedPassword,
      },
    });

    const accessToken = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    c.status(200);
    return c.json({
      success: true,
      token: accessToken,
      message: "User Created successfully",
    });
  } catch (error) {
    c.status(403);
    return c.json({
      success: false,
      message: "Invalid",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  // zod validation import from npm package hiterx100/medium-common
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not correct",
    });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        success: false,
        error: "Invalid email",
      });
    }

    // compare the password with the hashed password to check if user has sent the correct pwd
    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      c.status(403);
      return c.json({
        success: false,
        message: "Invalid password",
      });
    }

    // sign(payload, seceret) - looks like this
    const accessToken = await sign({ id: user.id }, c.env.JWT_SECRET);

    c.status(200);
    return c.json({
      success: true,
      token: accessToken,
      message: "Signed in successfully",
    });
  } catch (error) {
    c.status(403);
    return c.json({
      success: false,
      message: "Invalid",
    });
  }
});
