import { Router, Request, Response } from 'express';

// dotenv
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

// google
import { google, Auth, calendar_v3 } from 'googleapis';
import credentials from '../credentials/credentials.json';

// GET /api/reservations/:date
router.get('/:date', async (req: Request, res: Response) => {
  const date = req.params.date;

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
  await calendar.events.list(
    {
      auth: jwtClient,
      calendarId: process.env.CALENDAR_ID,
      timeMax: `${date}T23:59:59.999Z`,
      timeMin: `${date}T00:00:00.000Z`,
      timeZone: 'Asia/Tokyo',
    },
    (err, calendar) => {
      if (err) {
        console.log(err);
      } else {
        const results = calendar?.data.items;

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

        res.json(events);
      }
    }
  );
});

export default router;
