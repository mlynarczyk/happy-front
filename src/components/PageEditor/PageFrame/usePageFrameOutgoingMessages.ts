import { useTransformEffect } from "react-zoom-pan-pinch";
import { useEventListener } from "usehooks-ts";
import { ALL_SCREEN_SIZES } from "../../Canvas/CanvasStore";
import type { ScreenSize } from "../../Page/ScreenSize";
import { type Target, usePageEditorStore } from "../PageEditorStore";
import {
	CHILD_FRAME_ORIGIN,
	REMOVE_TARGET_TYPE,
	UPSERT_TARGET_TYPE,
	useChildFrameOriginListener,
} from "./FrameBridgeApi";

export const usePageFrameOutgoingMessages = () => {
	const { upsertTarget, removeTarget } = usePageEditorStore(
		({ upsertTarget, removeTarget }) => {
			return { upsertTarget: upsertTarget, removeTarget };
		},
	);

	useChildFrameOriginListener((event, data) => {
		const screenSize = event.source.location.hash.split("#")[1];

		if (!ALL_SCREEN_SIZES.includes(screenSize)) return;

		if (data.type === UPSERT_TARGET_TYPE) {
			upsertTarget({
				...data.payload,
				frameName: screenSize,
			});
		}

		if (data.type === REMOVE_TARGET_TYPE) {
			removeTarget({
				...data.payload,
				frameName: screenSize,
			});
		}
	});
};
