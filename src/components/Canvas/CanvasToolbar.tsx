import type React from "react";
import { Button } from "../Button";

export const CanvasToolbar: React.FC = () => {
	const onZoomIn = () => window.top.postMessage({ type: "ZOOM_IN" }, "*");
	const onZoomOut = () => window.top.postMessage({ type: "ZOOM_OUT" }, "*");
	const onResetView = () => window.top.postMessage({ type: "RESET_VIEW" }, "*");
	const onCenterView = () =>
		window.top.postMessage({ type: "CENTER_VIEW" }, "*");

	return (
		<div>
			<Button label="Zoom In" onClick={onZoomIn} />
			<Button label="Zoom Out" onClick={onZoomOut} />
			<Button label="Reset View" onClick={onResetView} />
			<Button label="Center View" onClick={onCenterView} />
		</div>
	);
};
