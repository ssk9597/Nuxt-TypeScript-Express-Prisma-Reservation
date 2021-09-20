// dotenv
import dotenv from 'dotenv';
dotenv.config();

// google
import { google, Auth, calendar_v3 } from 'googleapis';

// moment
import moment from 'moment';

// types
import { Events } from './types/listEvent.type';
import { start } from 'repl';

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

  const results: calendar_v3.Schema$Event[] | undefined = calendars?.data.items;

  const events: Events = [];

  results?.forEach((result: calendar_v3.Schema$Event | undefined) => {
    const startDateTime = moment(result?.start?.dateTime);
    const endDateTime = moment(result?.end?.dateTime);

    const startDateTimeOClock = startDateTime.format('mm');
    const endDateTimeOClock = endDateTime.format('mm');

    // 予約の開始と終了の分が0の場合
    if (startDateTimeOClock === '00' && endDateTimeOClock === '00') {
      // 予約された時間が1時間以下とそれ以外で条件分岐を行う
      const differenceTime = endDateTime.diff(startDateTime, 'hours');

      // 1時間未満
      if (differenceTime <= 1) {
        events.push({
          date: result?.start?.dateTime?.substr(0, 10),
          time: result?.start?.dateTime?.substr(11, 5),
        });
      } else {
        // 1時間以上
        for (let i = 0; i < differenceTime; i++) {
          const START_DATE_TIME = startDateTime.add(i, 'hours').format();

          events.push({
            date: START_DATE_TIME.substr(0, 10),
            time: START_DATE_TIME.substr(11, 5),
          });
        }
      }
    } else {
      // 予約の開始と終了の分が0以外の場合
      const START_DATE_TIME = startDateTime.subtract(startDateTimeOClock, 'minute');
      let END_DATE_TIME;
      if (endDateTimeOClock === '00') {
        END_DATE_TIME = endDateTime;
      } else {
        END_DATE_TIME = endDateTime.add(60 - Number(endDateTimeOClock), 'minute');
      }

      // 予約された時間が1時間以下とそれ以外で条件分岐を行う
      const differenceTime = END_DATE_TIME.diff(START_DATE_TIME, 'hours');

      // 1時間未満
      if (differenceTime <= 1) {
        events.push({
          date: START_DATE_TIME.format('YYYY-MM-DD'),
          time: START_DATE_TIME.format('HH:mm'),
        });
      } else {
        // 1時間以上
        for (let i = 0; i < differenceTime; i++) {
          const ADD_START_DATE_TIME = START_DATE_TIME.add(i, 'hours').format();

          events.push({
            date: ADD_START_DATE_TIME.substr(0, 10),
            time: ADD_START_DATE_TIME.substr(11, 5),
          });
        }
      }
    }
  });

  return events;
};
