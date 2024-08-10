import type { ScreenSize } from "../Page/ScreenSize";
import { BREAKPOINT_SPACING } from "./Canvas";
import { useCanvasStore } from "./CanvasStore";

export const useFocusableScreenSizeCanvasPosition = () => {
	if (!window) throw new Error("This hook is mean to be used client side only");

	const viewportWidth = window.innerWidth;

	const visibleScreenSizes = useCanvasStore(({ screenSizes }) => screenSizes);

	const calculateContentWidth = (index: number) => {
		const visibleScreenSize = visibleScreenSizes[index];

		if (!visibleScreenSize) throw new Error("Screen size not found");

		const visibleScreenSizeWidth = visibleScreenSize.width;

		const paddingsWidth = 2 * BREAKPOINT_SPACING;

		return visibleScreenSizeWidth + paddingsWidth;
	};

	const calculatePreviousWidths = (index: number) => {
		return visibleScreenSizes
			.slice(0, index)
			.map((screenSize) => screenSize.width + BREAKPOINT_SPACING)
			.reduce((acc, width) => acc + width, 0);
	};

	return visibleScreenSizes.map((screenSize, index) => {
		const contentWidth = calculateContentWidth(index);

		const scale = viewportWidth / contentWidth;

		// Calculate the new width of the content after scaling
		const scaledContentWidth = contentWidth * scale;

		// Calculate offsetX to include previous screen sizes width and breakpoint spacing
		const previousWidths = calculatePreviousWidths(index);
		const previousScaledWidths = previousWidths * scale;

		const offsetX = viewportWidth - (scaledContentWidth + previousScaledWidths);

		// offsetY remains 0 as vertical centering is not required
		const offsetY = 0;

		return {
			width: screenSize.width,
			scale,
			offsetX,
			offsetY,
		};
	});
};
