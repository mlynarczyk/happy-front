import type React from "react";
import { useEffect, useRef } from "react";
import { useTransformEffect } from "react-zoom-pan-pinch";
import { uuid } from "../../utils/uuid";
import { usePageEditorStore } from "../PageEditor/PageEditorStore";
import type { ScreenSize } from "./ScreenSize";

export const ElementReporter: React.FC<{
	trackedElement: HTMLElement | null;
}> = ({ trackedElement }) => {
	const { current: id } = useRef(uuid());

	const { upsertTarget, removeTarget } = usePageEditorStore(
		({ upsertTarget, removeTarget }) => {
			return { upsertTarget: upsertTarget, removeTarget };
		},
	);

	useTransformEffect(() => {
		if (!trackedElement) return;

		upsertTarget({
			uuid: id,
			type: "target",
			rect: trackedElement.getBoundingClientRect(),
		});
	});

	useEffect(() => {
		if (!trackedElement) return;

		upsertTarget({
			uuid: id,
			type: "target",
			rect: trackedElement.getBoundingClientRect(),
		});

		return () => {
			removeTarget({
				uuid: id,
				type: "target",
				rect: trackedElement.getBoundingClientRect(),
			});
		};
	}, [trackedElement, removeTarget, upsertTarget]);

	return null;
};
