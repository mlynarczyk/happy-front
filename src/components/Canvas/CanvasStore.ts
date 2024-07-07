import type { RefObject } from "react";
import { createRef } from "react";
import type { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { create } from "zustand";
import type { TPage } from "../../types/TPage";

export type CanvasStore = {
	transformWrapperRef: RefObject<ReactZoomPanPinchRef | null>;

	canvas: TPage;
	setCanvas: (canvas: TPage) => void;
};

export const useCanvasStore = create<CanvasStore>()((set) => ({
	transformWrapperRef: createRef<ReactZoomPanPinchRef | null>(),

	page: null as unknown as TPage,
	setCanvas: (canvas) => {
		set({ canvas });
	},
}));
