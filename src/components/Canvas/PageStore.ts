import { create } from "zustand";
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
