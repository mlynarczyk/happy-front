import type { RefObject } from "react";
import { createRef } from "react";
import type { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { create } from "zustand";
import type { TPage } from "../../types/TPage";
import { uuid } from "../../utils/uuid";
import type { ScreenSize } from "../Page/ScreenSize";
import { INITIAL_SCREEN_SIZES } from "../Page/ScreenSize";

export type CanvasStore = {
	transformWrapperRef: RefObject<ReactZoomPanPinchRef | null>;
	screenSizes: ScreenSize[];
	addScreenSize: () => void;
	removeScreenSize: (screenSize: ScreenSize) => void;
	canvas: TPage;
	setCanvas: (canvas: TPage) => void;
};

const ALL_SCREEN_SIZES = ["desktop", "tablet", "phone"] as const;

export const useCanvasStore = create<CanvasStore>()((set) => ({
	transformWrapperRef: createRef<ReactZoomPanPinchRef | null>(),
	screenSizes: ALL_SCREEN_SIZES,
	addScreenSize: () => {
		set(({ screenSizes }) => {
			if (screenSizes.length === 3) return {};

			if (screenSizes.length === 2)
				return {
					screenSizes: ALL_SCREEN_SIZES,
				};

			const missingScreenSizes = ALL_SCREEN_SIZES.filter(
				(x) => !screenSizes.includes(x),
			);

			return {
				screenSizes: [...screenSizes, missingScreenSizes[0]],
			};
		});
	},
	removeScreenSize: (screenSizeToRemove) => {
		set(({ screenSizes }) => {
			if (screenSizes.length === 1) return {};

			return {
				screenSizes: screenSizes.filter(
					(screenSize) => screenSize !== screenSizeToRemove,
				),
			};
		});
	},
	page: null as unknown as TPage,
	setCanvas: (canvas) => {
		set({ canvas });
	},
}));
