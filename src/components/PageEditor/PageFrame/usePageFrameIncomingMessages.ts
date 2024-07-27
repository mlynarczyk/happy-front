import { useEventListener } from "usehooks-ts";
import { type Target, usePageEditorStore } from "../PageEditorStore";

type IframeEvent =
	| {
			type: "loaded";
	  }
	| {
			type: "upsert-target";
			target: Target;
	  }
	| {
			type: "remove-target";
			target: Target;
	  }
	| {
			type: "canvas-transformed";
	  };
export const usePageFrameIncomingMessages = (frameId) => {
	const { upsertTarget, removeTarget } = usePageEditorStore(
		({ upsertTarget, removeTarget }) => {
			return { upsertTarget: upsertTarget, removeTarget };
		},
	);

	useEventListener("message", (event) => {
		const payload = JSON.parse(event.data) as unknown;

		if (!payload || !payload?.type) return;

		if (payload.type === "upsert-target") {
			upsertTarget(payload.target);
		}

		if (payload.type === "remove-target") {
			removeTarget(payload.target);
		}
	});
};
