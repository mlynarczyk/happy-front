import type React from "react";
import { useEffect, useRef } from "react";
import { useEventListener } from "usehooks-ts";
import { uuid } from "../../utils/uuid";
import {
	CANVAS_TRANSFORMED,
	PARENT_FRAME_ORIGIN,
	REMOVE_TARGET_TYPE,
	TARGET_TYPE_TARGET,
	UPSERT_TARGET_TYPE,
	sendChildOriginMessage,
} from "../PageEditor/PageFrame/FrameBridgeApi";

export const ElementReporter: React.FC<{
	trackedElement: HTMLElement | null;
}> = ({ trackedElement }) => {
	const { current: id } = useRef(uuid());

	useEventListener("message", (event) => {
		const payload = event.data as unknown;

		if (!payload || payload.type !== PARENT_FRAME_ORIGIN) return;

		if (payload.type === CANVAS_TRANSFORMED) {
			if (!trackedElement) return;

			sendChildOriginMessage(window.parent, {
				type: UPSERT_TARGET_TYPE,
				payload: {
					uuid: id,
					type: TARGET_TYPE_TARGET,
					rect: trackedElement.getBoundingClientRect(),
				},
			});
		}
	});

	useEffect(() => {
		if (!trackedElement) return;

		sendChildOriginMessage(window.parent, {
			type: UPSERT_TARGET_TYPE,
			payload: {
				uuid: id,
				type: TARGET_TYPE_TARGET,
				rect: trackedElement.getBoundingClientRect(),
			},
		});

		return () => {
			sendChildOriginMessage(window.parent, {
				type: REMOVE_TARGET_TYPE,
				payload: {
					uuid: id,
					type: "target",
					rect: trackedElement.getBoundingClientRect(),
				},
			});
		};
	}, [trackedElement]);

	return null;
};
