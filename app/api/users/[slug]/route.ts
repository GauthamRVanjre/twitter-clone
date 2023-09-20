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
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connect();
    const userData = await prisma.user.update({
      where: {
        id: params.slug,
      },
      data: {
        ...JSON.parse(await req.text()),
      },
    });

    return new Response(JSON.stringify(userData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong!" }), {
      status: 500,
    });
  }
}
