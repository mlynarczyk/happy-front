import type React from "react";
import { Button } from "../Button";

import { useControls } from "react-zoom-pan-pinch";
import { useCanvasStore } from "./CanvasStore";
import * as S from "./CanvasToolbar.styles";
import { useInitialCanasPosition } from "./useInitialCanasPosition";

export const CanvasToolbar: React.FC = () => {
	const { zoomIn, zoomOut, setTransform } = useControls();

	const { offsetY, offsetX, scale } = useInitialCanasPosition();

	const onResetView = () => {
		setTransform(offsetX, offsetY, scale, 0);
	};

	return (
		<S.Toolbar>
			<S.ToolbarCenter>
				<Button
					label="Zoom In"
					onClick={() => {
						zoomIn(0.2);
					}}
				/>
				<Button
					label="Zoom Out"
					onClick={() => {
						zoomOut(0.2);
					}}
				/>
				<Button label="Reset View" onClick={onResetView} />
			</S.ToolbarCenter>
		</S.Toolbar>
	);
};
