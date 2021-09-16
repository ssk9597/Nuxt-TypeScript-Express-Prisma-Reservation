import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const findUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};
