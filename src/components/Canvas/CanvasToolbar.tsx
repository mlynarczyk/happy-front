import type React from "react";
import { Button } from "../Button";

import { useControls } from "react-zoom-pan-pinch";
import * as S from "./CanvasToolbar.styles";
import { useFocusableScreenSizeCanvasPosition } from "./useFocusableScreenSizeCanvasPosition";
import { useInitialCanvasPosition } from "./useInitialCanvasPosition";

export const CanvasToolbar: React.FC = () => {
	const { zoomIn, zoomOut, setTransform, instance } = useControls();

	const { offsetY, offsetX, scale } = useInitialCanvasPosition();

	const focusableScreenSizeCanvasPositions =
		useFocusableScreenSizeCanvasPosition();

	const onResetView = () => {
		setTransform(offsetX, offsetY, scale, 200);
	};

	return (
		<S.Toolbar>
			<S.ToolbarCenter>
				<Button label="All" onClick={onResetView} />

				{focusableScreenSizeCanvasPositions.map(
					(focusableScreenSizeCanvasPosition, index) => {
						return (
							<Button
								key={`${index}-${focusableScreenSizeCanvasPosition.width}`}
								label={`${focusableScreenSizeCanvasPosition.width}`}
								onClick={() => {
									setTransform(
										focusableScreenSizeCanvasPosition.offsetX,
										focusableScreenSizeCanvasPosition.offsetY,
										focusableScreenSizeCanvasPosition.scale,
										200,
									);
								}}
							/>
						);
					},
				)}

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
			</S.ToolbarCenter>
		</S.Toolbar>
	);
};
