// dotenv
import dotenv from 'dotenv';
dotenv.config();

// google
import { google, Auth, calendar_v3 } from 'googleapis';
import credentials from '../credentials/credentials.json';

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
    const jwtClient: Auth.JWT = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      keyFile: undefined,
      keyId: undefined,
      scopes: scopes,
      subject: undefined,
    });

    // カレンダー
    const calendar: calendar_v3.Calendar = google.calendar('v3');

    // JWTの認証を行ってイベントのリストを表示する
    const calendars = await calendar.events.list({
      auth: jwtClient,
      calendarId: process.env.CALENDAR_ID,
      timeMax: `${date}T23:59:59.999Z`,
      timeMin: `${date}T00:00:00.000Z`,
      timeZone: 'Asia/Tokyo',
    });

    const results = calendars?.data.items;

    // types
    type Events = {
      date: string | undefined;
      time: string | undefined;
    }[];

    const events: Events = [];

    results?.forEach((result) => {
      events.push({
        date: result.start?.dateTime?.substr(0, 10),
        time: result.start?.dateTime?.substr(11, 5),
      });
    });

    return events;
  },
};

export default reservations;
