// dotenv
import dotenv from 'dotenv';
dotenv.config();

// google
import { google, Auth, calendar_v3 } from 'googleapis';

// types
import { Events } from './types/listEvent.type';

export const listEvent = async (date: string, jwt: Auth.JWT) => {
  // カレンダー
  const calendar: calendar_v3.Calendar = google.calendar('v3');

  // JWTの認証を行ってイベントのリストを表示する
  const calendars = await calendar.events.list({
    auth: jwt,
    calendarId: process.env.CALENDAR_ID,
    timeMax: `${date}T23:59:59.999Z`,
    timeMin: `${date}T00:00:00.000Z`,
    timeZone: 'Asia/Tokyo',
  });

  const results = calendars?.data.items;

  const events: Events = [];

  results?.forEach((result) => {
    events.push({
      date: result.start?.dateTime?.substr(0, 10),
      time: result.start?.dateTime?.substr(11, 5),
    });
  });

  return events;
};
