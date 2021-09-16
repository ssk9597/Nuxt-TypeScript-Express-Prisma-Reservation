import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const registerUserReservation = async (
  firstName: string,
  lastName: string,
  email: string,
  date: string,
  time: string
) => {
  await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      reservation: {
        create: {
          date: date,
          time: time,
        },
      },
    },
  });
};
