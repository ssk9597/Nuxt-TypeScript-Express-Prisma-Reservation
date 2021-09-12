export type Reservations = {
  date: string;
  id: number;
  time: string;
  userId: number;
}[];
export type TimeTable = {
  clock: string;
  isEmpty: boolean;
}[];
export type ClickPrevSelectDate = {
  (): void;
};
export type ClickChooseTime = {
  (time: string): void;
};

export type Props = {
  date: string;
  reservations: Reservations;
  today: object;
  timeTable: TimeTable;
  clickPrevSelectDate: ClickPrevSelectDate;
  clickChooseTime: ClickChooseTime;
};
