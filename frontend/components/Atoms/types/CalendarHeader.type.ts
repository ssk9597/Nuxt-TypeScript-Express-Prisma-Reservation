export type CompareToday = {
  yearMonth: number;
  yearMonthDay: number;
};

export type CompareCurrentDate = {
  yearMonth: number;
  yearMonthDay: number;
};

export type ClickChildPrevMonth = {
  (): void;
};

export type ClickChildNextMonth = {
  (): void;
};

export type Props = {
  compareToday: CompareToday;
  compareCurrentDate: CompareCurrentDate;
  getYearMonthToday: string;
  clickChildPrevMonth: ClickChildPrevMonth;
  clickChildNextMonth: ClickChildNextMonth;
};
