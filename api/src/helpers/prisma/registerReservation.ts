import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const registerReservation = async (date: string, time: string, userId: number) => {
  await prisma.reservation.create({
    data: {
      date: date,
      time: time,
      userId: userId,
    },
  });
};
