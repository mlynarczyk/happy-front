import type React from "react";
import { useEffect, useRef } from "react";
import { useDebounceCallback, useEventListener } from "usehooks-ts";
import { uuid } from "../../utils/uuid";

export const ElementReporter: React.FC<{
	trackedElement: HTMLElement | null;
}> = ({ trackedElement }) => {
	const { current: id } = useRef(uuid());

	useEventListener("message", (event) => {
		const payload = event.data as unknown;

		if (!payload || payload.source !== "happybara") return;

		if (!payload || !payload?.type) return;

		if (payload.type === "canvas-transformed") {
			if (!trackedElement) return;

			window.parent.postMessage({
				source: "happybara",
				type: "upsert-target",
				target: {
					uuid: id,
					type: "target",
					rect: trackedElement.getBoundingClientRect(),
				},
			});
		}
	});

	useEffect(() => {
		if (!trackedElement) return;

		window.parent.postMessage(
			JSON.stringify({
				source: "happybara",
				type: "upsert-target",
				target: {
					uuid: id,
					type: "target",
					rect: trackedElement.getBoundingClientRect(),
				},
			}),
		);

		return () => {
			window.parent.postMessage(
				JSON.stringify({
					source: "happybara",
					type: "remove-target",
					target: {
						uuid: id,
						type: "target",
						rect: trackedElement.getBoundingClientRect(),
					},
				}),
			);
		};
	}, [trackedElement]);

	return null;
};
