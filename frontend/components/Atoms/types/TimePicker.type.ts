export type TimeTable = {
  clock: string;
  isEmpty: boolean;
}[];

export type ClickChildChooseTime = {
  (time: string): void;
};

export type Props = {
  timeTable: TimeTable;
  clickChildChooseTime: ClickChildChooseTime;
};
