import { connect } from "@/app/helpers/server-helper";
import { userProfileTypes } from "@/app/types/types";
import prisma from "@/prisma/prisma";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connect();
    const userResult = await prisma.user.findUnique({
      where: {
        id: params.slug,
      },
      include: {
        posts: {
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
        },
      },
    });

    return new Response(JSON.stringify(userResult), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: `${error}` }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.text();
    await connect();

    const response = await prisma.user.update({
      where: {
        id: params.slug,
      },
      data: {
        ...JSON.parse(body),
      },
    });

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong!" }), {
      status: 500,
    });
  } finally {
    prisma.$disconnect();
  }
}
