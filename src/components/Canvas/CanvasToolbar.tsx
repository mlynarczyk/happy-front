import { css } from "@emotion/react";
import type React from "react";
import { Button } from "../Button";

import { createRef } from "react";
import { useCanvasStore } from "./CanvasStore";
import * as S from "./CanvasToolbar.styles";
import { ToolbarCenter } from "./CanvasToolbar.styles";

export const CanvasToolbar: React.FC = () => {
	const a = createRef<HTMLDivElement | null>();

	a.current;

	const transformWrapperRef = useCanvasStore(
		({ transformWrapperRef }) => transformWrapperRef,
	);

	const onZoomIn = () => {
		transformWrapperRef.current?.zoomIn(0.2);
	};

	const onZoomOut = () => {
		transformWrapperRef.current?.zoomOut(0.2);
	};

	const onCenterView = () => {
		transformWrapperRef.current?.centerView();
	};

	const onResetView = () => {
		transformWrapperRef.current?.resetTransform(0);
		setTimeout(() => transformWrapperRef.current?.centerView(0.8, 0), 10);
	};

	return (
		<S.Toolbar>
			<S.ToolbarCenter>
				<Button label="Zoom In" onClick={onZoomIn} />
				<Button label="Zoom Out" onClick={onZoomOut} />
				<Button label="Reset View" onClick={onResetView} />
				<Button label="Center View" onClick={onCenterView} />
			</S.ToolbarCenter>
		</S.Toolbar>
	);
};
