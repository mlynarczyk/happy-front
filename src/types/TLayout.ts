export type TLayout = TFlexLayout;

type TFlexLayout = {
  type: "flex";
  direction: "vertical" | "horizontal";
  alignment: "start" | "center" | "end" | "space-between" | "space-around";
  wrap: "wrap" | "nowrap" | "wrap-reverse";
  gap: number;
  padding: number;
};
