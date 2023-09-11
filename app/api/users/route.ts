import { connect } from "@/app/helpers/server-helper";
import prisma from "@/prisma/prisma";

export async function GET(req: Request) {
  try {
    await connect();
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: `${error}` }), {
      status: 401,
    });
  } finally {
    await prisma.$disconnect();
  }
}
