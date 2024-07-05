import type { TPage } from "../types/TPage";
import { uuid } from "../utils/uuid";

export const PageMock: TPage = {
  uuid: uuid(),
  name: "Example Page",
  sections: [
    {
      uuid: uuid(),
      layout: {
        type: "flex",
        direction: "vertical",
        alignment: "center",
        wrap: "wrap",
        gap: 10,
        padding: 10,
      },
      design: {
        opacity: 1,
        visibility: "visible",
        radius: "0px",
        backgroundColor: "transparent",
      },
    },
    {
      uuid: uuid(),
      layout: {
        type: "flex",
        direction: "vertical",
        alignment: "center",
        wrap: "wrap",
        gap: 10,
        padding: 10,
      },
      design: {
        opacity: 1,
        visibility: "visible",
        radius: "0px",
        backgroundColor: "transparent",
      },
    },
  ],
};
