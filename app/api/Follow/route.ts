import prisma from "@/prisma/prisma";

interface followProps {
  followId: string;
  currentUser: string;
  text: string;
}

export async function PUT(request: Request) {
  const requestBody: followProps = await request.json();

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        id: requestBody.currentUser,
      },
    });

    let updatedFollowingIds = [...(findUser?.followingIds || [])] as string[];

    if (requestBody.text === "follow") {
      updatedFollowingIds.push(requestBody.followId);
    } else {
      const filteredIds = updatedFollowingIds.filter(
        (id) => id !== requestBody.followId
      );
      updatedFollowingIds = filteredIds;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: requestBody.currentUser,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  }
}
