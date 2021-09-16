// dotenv
import dotenv from 'dotenv';
dotenv.config();

// google
import { google, Auth, calendar_v3 } from 'googleapis';

export const insertEvent = async (
  firstName: string,
  lastName: string,
  email: string,
  date: string,
  time: string,
  jwt: Auth.JWT
) => {
  // カレンダー
  const calendar: calendar_v3.Calendar = google.calendar('v3');

  // イベント情報
  const event = {
    summary: `${firstName} ${lastName}のご予約`,
    description: `【お名前】 ${firstName} ${lastName}, \n【メールアドレス】 ${email}`,
    start: {
      dateTime: `${date}T${time}:00+09:00`,
      timeZone: 'Asia/Tokyo',
    },
    end: {
      dateTime: `${date}T${time}:00+09:00`,
      timeZone: 'Asia/Tokyo',
    },
  };

  // JWTの認証を行い問題なければイベントを追加する
  await jwt.authorize((err) => {
    if (err) {
      console.log(err);
    } else {
      calendar.events.insert({
        auth: jwt,
        calendarId: process.env.CALENDAR_ID,
        requestBody: event,
      });
    }
  });
};
