import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const reservationRepository = {
  // メールアドレスが一致したユーザーがいた場合、予約情報のみ登録を行う
  async registerReservation(date: string, time: string, userId: number) {
    await prisma.reservation.create({
      data: {
        date: date,
        time: time,
        userId: userId,
      },
    });
  },
};

export default reservationRepository;
