import prisma from "@/prisma/prisma";

type requestBody = {
  body: string;
  id: string;
};

export async function POST(request: Request) {
  const requestBody: requestBody = await request.json();
  console.log("body before try", requestBody);

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
