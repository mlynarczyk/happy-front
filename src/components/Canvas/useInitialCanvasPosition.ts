import { SCREEN_SIZES } from "../Page/ScreenSize";
import { BREAKPOINT_SPACING } from "./Canvas";
import { useCanvasStore } from "./CanvasStore";

export const useInitialCanvasPosition = () => {
	const viewportWidth =
		typeof window === "undefined" ? 1440 : window.innerWidth;

	const visibleScreenSizes = useCanvasStore(({ screenSizes }) => screenSizes);

	const contentWidth = (() => {
		const visibleScreenSizesWidth = visibleScreenSizes
			.map((visibleBreakpoint) => {
				return SCREEN_SIZES[visibleBreakpoint].width;
			})
			.reduce((sum, item) => sum + item, 0);

		const paddingsWidth = (visibleScreenSizes.length + 1) * BREAKPOINT_SPACING;

		return visibleScreenSizesWidth + paddingsWidth;
	})();

	const scale = viewportWidth / contentWidth;

	// Calculate the new width of the content after scaling
	const scaledContentWidth = contentWidth * scale;

	// Calculate offsetX to center the content horizontally
	const offsetX = (viewportWidth - scaledContentWidth) / 2;

	// offsetY remains 0 as vertical centering is not required
	const offsetY = 0;

	return {
		scale,
		offsetX,
		offsetY,
	};
};
