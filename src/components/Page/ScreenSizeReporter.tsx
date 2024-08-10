import type React from "react";
import { useEffect, useRef } from "react";
import { useTransformEffect } from "react-zoom-pan-pinch";
import { uuid } from "../../utils/uuid";
import { useCanvasStore } from "../Canvas/CanvasStore";
import type { ScreenSize } from "./ScreenSize";

export const ScreenSizeReporter: React.FC<{
	trackedElement: HTMLDivElement | null;
	screenSize: ScreenSize;
}> = ({ trackedElement, screenSize }) => {
	const { current: id } = useRef(uuid());

	const { upsertTarget, removeTarget } = useCanvasStore(
		({ upsertTarget, removeTarget }) => {
			return { upsertTarget: upsertTarget, removeTarget };
		},
	);

	useTransformEffect(() => {
		if (!trackedElement) return;

		upsertTarget({
			uuid: id,
			type: "screen-size",
			screenSize: screenSize,
			rect: trackedElement.getBoundingClientRect(),
			payload: screenSize,
		});
	});

	useEffect(() => {
		if (!trackedElement) return;

		upsertTarget({
			uuid: id,
			type: "screen-size",
			screenSize: screenSize,
			rect: trackedElement.getBoundingClientRect(),
			payload: screenSize,
		});

		return () => {
			removeTarget({
				uuid: id,
				type: "screen-size",
				screenSize: screenSize,
			});
		};
	}, [trackedElement, removeTarget, upsertTarget, screenSize]);

	return null;
};
