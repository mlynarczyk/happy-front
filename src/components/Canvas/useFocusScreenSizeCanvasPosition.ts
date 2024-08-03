import { SCREEN_SIZES, type ScreenSize } from "../Page/ScreenSize";
import { BREAKPOINT_SPACING } from "./Canvas";
import { useCanvasStore } from "./CanvasStore";

export const useFocusScreenSizeCanvasPosition = (
	screenSizeName: ScreenSize,
) => {
	if (!window) throw new Error("This hook is mean to be used client side only");

	const viewportWidth = window.innerWidth;

	const visibleScreenSizes = useCanvasStore(({ screenSizes }) => screenSizes);

	const contentWidth = (() => {
		const visibleScreenSize = visibleScreenSizes.find(
			(vss) => vss === screenSizeName,
		);

		const visibleScreenSizesWidth = SCREEN_SIZES[visibleScreenSize].width;

		const paddingsWidth = 2 * BREAKPOINT_SPACING;

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
