import { create } from "zustand";
import type { TPage } from "../../types/TPage";

type TCanvas = {
	example?: true;
};

export type CanvasStore = {
	canvas: TPage;
	setCanvas: (canvas: TPage) => void;
};

export const useCanvasStore = create<CanvasStore>()((set) => ({
	page: null as unknown as TPage,
	setCanvas: (canvas) => {
		set({ canvas });
	},
}));
