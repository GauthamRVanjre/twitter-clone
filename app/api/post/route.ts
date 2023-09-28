import prisma from "@/prisma/prisma";

type requestBody = {
  body: string;
  id: string;
};

export async function POST(request: Request) {
  const requestBody: requestBody = await request.json();

  try {
    await prisma.$connect();
    const createPost = await prisma.post.create({
      data: {
        body: requestBody.body,
        user: {
          connect: {
            id: requestBody.id,
          },
        },
      },
    });

    return new Response(JSON.stringify(createPost), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: `${error}` }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: Request) {
  try {
    await prisma.$connect();
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            name: true,
            username: true,
            profilePic: true,
          },
        },
        comments: {
          select: {
            id: true,
            body: true,
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                profilePic: true,
              },
            },
          },
        },
      },
    });

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong!" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
