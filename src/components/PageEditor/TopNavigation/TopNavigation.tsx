import type React from "react";
import { useControls } from "react-zoom-pan-pinch";
import { useCanvasStore } from "../../Canvas/CanvasStore";
import { useInitialCanvasPosition } from "../../Canvas/useInitialCanvasPosition";
import { usePageEditorStore } from "../PageEditorStore";

export const TopNavigation: React.FC = () => {
	const transformWrapperRef = useCanvasStore(({ transformWrapperRef }) => {
		return transformWrapperRef;
	});

	const { offsetY, offsetX, scale } = useInitialCanvasPosition();

	transformWrapperRef.current?.state;

	return null;
};
