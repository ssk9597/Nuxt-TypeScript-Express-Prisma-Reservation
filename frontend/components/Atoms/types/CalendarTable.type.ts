export type GetCalendar = {
  day: number;
  date: string;
  month: string;
  yearMonth: number;
  yearMonthDay: number;
  googleCalendarDate: string;
}[];

export type CompareCurrentDate = {
  yearMonth: number;
  yearMonthDay: number;
};

export type CompareToday = {
  yearMonth: number;
  yearMonthDay: number;
};

export type ClickChildChooseDate = {
  (date: string): void;
};

export type Props = {
  getCalendar: GetCalendar;
  compareCurrentDate: CompareCurrentDate;
  compareToday: CompareToday;
  clickChildChooseDate: ClickChildChooseDate;
};
