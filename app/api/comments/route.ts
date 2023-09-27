import prisma from "@/prisma/prisma";

interface RequestBody {
  body: string;
  userId: string;
  postId: string;
}

export async function POST(request: Request) {
  const requestBody: RequestBody = await request.json();

  try {
    await prisma.$connect();

    const postComment = await prisma.comment.create({
      data: {
        body: requestBody.body,
        updatedAt: new Date(),
        user: {
          connect: {
            id: requestBody.userId,
          },
        },
        post: {
          connect: {
            id: requestBody.postId,
          },
        },
      },
    });

    return new Response(JSON.stringify(postComment), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "comment could not be submitter" }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
