// helpers
// google
import { jwtClient } from '../helpers/google/jwtClient';
import { listEvent } from '../helpers/google/listEvent';

const reservations = {
  async index(date: string) {
    // 必要なスコープの定義
    const scopes = [
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events.readonly',
      'https://www.googleapis.com/auth/calendar.events',
    ];

    // JWTクライアントをサービスアカウントで認証する
    const jwt = await jwtClient(scopes);

    // イベントのリストを表示する
    const events = await listEvent(date, jwt);

    return events;
  },
};

export default reservations;
