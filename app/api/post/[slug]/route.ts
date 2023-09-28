import prisma from "@/prisma/prisma";

interface requestBody {
  id: string;
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const body: requestBody = JSON.parse(await request.text());
  try {
    await prisma.$connect();

    const findPost = await prisma.post.findUnique({
      where: {
        id: params.slug,
      },
    });

    let likedIds = findPost?.likedIds || [];

    if (body.id === undefined) {
      return new Response(JSON.stringify({ message: "cannot like tweet" }), {
        status: 401,
      });
    }

    const postUpdate = await prisma.post.update({
      where: {
        id: params.slug,
      },
      data: {
        likedIds: {
          set: [...likedIds, body.id],
        },
      },
    });

    return new Response(JSON.stringify(postUpdate), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await prisma.$connect();

    const postResult = await prisma.post.findUnique({
      where: {
        id: params.slug,
      },
      include: {
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

    return new Response(JSON.stringify(postResult), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
