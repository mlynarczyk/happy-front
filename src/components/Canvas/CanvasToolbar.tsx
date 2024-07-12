import type React from "react";
import { Button } from "../Button";

import { useControls } from "react-zoom-pan-pinch";
import { useCanvasStore } from "./CanvasStore";
import * as S from "./CanvasToolbar.styles";
import { useInitialCanvasPosition } from "./useInitialCanvasPosition";

export const CanvasToolbar: React.FC = () => {
	const { zoomIn, zoomOut, setTransform, instance } = useControls();

	const { offsetY, offsetX, scale } = useInitialCanvasPosition();

	const onResetView = () => {
		setTransform(offsetX, offsetY, scale, 200);
	};

	console.log(instance);

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
