import type { TSection } from "./TSection";

export type TPage = {
  uuid: string;
  name: string;
  sections: TSection[];
};
