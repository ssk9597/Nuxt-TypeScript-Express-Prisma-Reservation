// repositories
import userRepository from '../repositories/user.repository';
import reservationRepository from '../repositories/reservation.repository';

// helpers
import { jwtClient } from '../helpers/google/jwtClient';
import { insertEvent } from '../helpers/google/insertEvent';

const users = {
  async store(firstName: string, lastName: string, email: string, date: string, time: string) {
    try {
      // メールアドレスが一致するユーザーを取り出す
      const user = await userRepository.findUser(email);

      if (user) {
        // 予約情報を登録する
        await reservationRepository.registerReservation(date, time, user.id);
      } else {
        // ユーザーと予約情報を登録する
        await userRepository.registerUserReservation(firstName, lastName, email, date, time);
      }

      // 必要なスコープの定義
      const scopes = [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
      ];

      // JWTクライアントをサービスアカウントで認証する
      const jwt = await jwtClient(scopes);

      // カレンダーに登録を行う
      await insertEvent(firstName, lastName, email, date, time, jwt);
    } catch (err) {
      console.log(err);
    }
  },
};

export default users;
