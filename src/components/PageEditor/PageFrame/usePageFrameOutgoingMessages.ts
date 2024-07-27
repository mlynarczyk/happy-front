import { useTransformEffect } from "react-zoom-pan-pinch";
import { useEventListener } from "usehooks-ts";
import { ALL_SCREEN_SIZES } from "../../Canvas/CanvasStore";
import type { ScreenSize } from "../../Page/ScreenSize";
import { type Target, usePageEditorStore } from "../PageEditorStore";

type IframeOutgoingMessage =
	| {
			source: "happybara";
			type: "loaded";
	  }
	| {
			source: "happybara";
			frameName: ScreenSize;
			type: "upsert-target";
			target: Target;
	  }
	| {
			source: "happybara";
			frameName: ScreenSize;
			type: "remove-target";
			target: Target;
	  };
export const usePageFrameOutgoingMessages = () => {
	const { upsertTarget, removeTarget } = usePageEditorStore(
		({ upsertTarget, removeTarget }) => {
			return { upsertTarget: upsertTarget, removeTarget };
		},
	);

	useEventListener("message", (event) => {
		const payload = event.data as unknown;

		if (!payload || payload.source !== "happybara") return;

		const screenSize = event.source.location.hash.split("#")[1];

		if (!ALL_SCREEN_SIZES.includes(screenSize)) return;

		if (payload.type === "upsert-target") {
			upsertTarget({
				...payload.target,
				frameName: screenSize,
			});
		}

		if (payload.type === "remove-target") {
			removeTarget({
				...payload.target,
				frameName: screenSize,
			});
		}
	});
};
