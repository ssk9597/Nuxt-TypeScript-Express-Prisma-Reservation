export type Click = {
  (): void;
};

export type Props = {
  click: Click;
  invalid: boolean;
};
