import { useCanvasStore } from "../../Canvas/CanvasStore";
import type { ScreenSize } from "../../Page/ScreenSize";
import {
	REMOVE_TARGET_TYPE,
	UPSERT_TARGET_TYPE,
	useChildFrameOriginListener,
} from "./FrameBridgeApi";

export const usePageFrameOutgoingMessages = (screenSize: ScreenSize) => {
	const { isScreenSizePresent, upsertTarget, removeTarget } = useCanvasStore(
		({ screenSizes, isScreenSizePresent, upsertTarget, removeTarget }) => ({
			screenSizes,
			isScreenSizePresent,
			upsertTarget,
			removeTarget,
		}),
	);

	useChildFrameOriginListener((event, data) => {
		if (!isScreenSizePresent(screenSize)) return;

		// @ts-ignore
		const eventScreenSizeUuid = event.source.location.hash.split(
			"#",
		)[1] as string;

		if (screenSize.uuid !== eventScreenSizeUuid) return;

		if (data.type === UPSERT_TARGET_TYPE) {
			upsertTarget({
				...data.payload,
				screenSize: screenSize,
			});
		}

		if (data.type === REMOVE_TARGET_TYPE) {
			removeTarget({
				...data.payload,
				screenSize: screenSize,
			});
		}
	});
};
