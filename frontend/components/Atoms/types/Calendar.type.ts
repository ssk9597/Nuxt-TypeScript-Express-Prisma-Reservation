export type ClickPrevMonth = {
  (): void;
};
export type ClickNextMonth = {
  (): void;
};
export type ClickChooseDate = {
  (date: string): void;
};

export type Props = {
  currentDate: object;
  today: object;
  clickPrevMonth: ClickPrevMonth;
  clickNextMonth: ClickNextMonth;
  clickChooseDate: ClickChooseDate;
};
