import { connect } from "@/app/helpers/server-helper";
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
