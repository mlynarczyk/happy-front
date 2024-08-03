import type React from "react";
import { Button } from "../Button";

import { useControls } from "react-zoom-pan-pinch";
import { useCanvasStore } from "./CanvasStore";
import * as S from "./CanvasToolbar.styles";
import { useFocusScreenSizeCanvasPosition } from "./useFocusScreenSizeCanvasPosition";
import { useInitialCanvasPosition } from "./useInitialCanvasPosition";

export const CanvasToolbar: React.FC = () => {
	const { zoomIn, zoomOut, setTransform, instance } = useControls();

	const { offsetY, offsetX, scale } = useInitialCanvasPosition();

	const desktop = useFocusScreenSizeCanvasPosition("desktop");

	const onFocusDesktop = () => {
		setTransform(desktop.offsetX, desktop.offsetY, desktop.scale, 200);
	};
	const onResetView = () => {
		setTransform(offsetX, offsetY, scale, 200);
	};

	return (
		<S.Toolbar>
			<S.ToolbarCenter>
				<Button label="Desktop" onClick={onFocusDesktop} />

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

				<Button
					label="Set zoom 100"
					onClick={() => {
						const { positionX, positionY } = instance.transformState;

						setTransform(positionX, positionY, 1);
					}}
				/>

				<Button label="Reset View" onClick={onResetView} />
			</S.ToolbarCenter>
		</S.Toolbar>
	);
};
