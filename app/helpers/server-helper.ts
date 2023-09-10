import prisma from "@/prisma/prisma";

export const connect = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    throw new Error("unable to connect");
  }
};
