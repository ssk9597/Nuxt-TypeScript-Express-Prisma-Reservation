import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const userRepository = {
  // メールアドレスが一致するユーザーを 1 人取り出す
  async findUser(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  },

  // メールアドレスが一致したユーザーがいない場合、ユーザー情報と予約情報の登録を行う
  async registerUserReservation(
    firstName: string,
    lastName: string,
    email: string,
    date: string,
    time: string
  ) {
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
  },
};

export default userRepository;
