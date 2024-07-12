import type React from "react";
import { useEffect, useId, useRef } from "react";
import { useTransformEffect } from "react-zoom-pan-pinch";
import { uuid } from "../../utils/uuid";
import { usePageEditorStore } from "../PageEditor/PageEditorStore";

export const ScreenSizeReporter: React.FC<{
	trackedElement: HTMLDivElement | null;
}> = ({ trackedElement }) => {
	const { current: id } = useRef(uuid());

	const { addTarget, removeTarget } = usePageEditorStore(
		({ addTarget, removeTarget }) => {
			return { addTarget, removeTarget };
		},
	);

	useTransformEffect((context) => {
		if (!trackedElement) return;

		addTarget({
			uuid: id,
			type: "ScreenSize",
			rect: trackedElement.getBoundingClientRect(),
		});
	});

	useEffect(() => {
		if (!trackedElement) return;

		addTarget({
			uuid: id,
			type: "ScreenSize",
			rect: trackedElement.getBoundingClientRect(),
		});

		return () => {
			removeTarget({
				uuid: id,
				type: "ScreenSize",
				rect: trackedElement.getBoundingClientRect(),
			});
		};
	}, [trackedElement, removeTarget, addTarget]);

	return null;
};
