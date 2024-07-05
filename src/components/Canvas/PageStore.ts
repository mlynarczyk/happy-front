import { ResumeData } from "@reactive-resume/schema";
import { create } from "zustand";
import { Canvas } from "./Canvas";
import type { TPage } from "../types/TPage";

export type PageStore = {
  page: TPage;
  setPage: (page: TPage) => void;
};

export const usePageStore = create<PageStore>()((set) => ({
  page: null as unknown as TPage,
  setPage: (page) => {
    set({ page });
  },
}));
