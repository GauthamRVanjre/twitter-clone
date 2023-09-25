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

    const postUpdate = await prisma.post.update({
      where: {
        id: params.slug,
      },
      data: {
        // ...JSON.parse(body),
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
  }
}
