import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useTransformEffect } from "react-zoom-pan-pinch";
import { useEventListener } from "usehooks-ts";
import { uuid } from "../../../utils/uuid";
import type { ScreenSize } from "../../Page/ScreenSize";
import { usePageFrameIncomingMessages } from "./usePageFrameIncomingMessages";
import { usePageFrameOutgoingMessages } from "./usePageFrameOutgoingMessages";

export const PageFrame: React.FC<{
	screenSize: ScreenSize;
}> = ({ screenSize }) => {
	const ref = useRef<HTMLIFrameElement | null>(null);
	const { current: id } = useRef(uuid());
	const [height, setHeight] = useState(0);

	const onLoad = () => {
		if (!ref.current?.contentWindow) return;

		const height = ref.current.contentWindow.document.body.scrollHeight;

		setHeight(height);
	};

	usePageFrameOutgoingMessages(screenSize);

	useTransformEffect(() => {
		if (!ref.current) return;

		ref.current.contentWindow.postMessage({
			source: "happybara",
			type: "canvas-transformed",
		});
	});

	useEventListener("message", (event) => {
		const payload = event.data as unknown;

		if (!payload || payload.source !== "happybara") return;

		const eventScreenSize = event.source.location.hash.split("#")[1];

		if (screenSize !== eventScreenSize) return;

		if (payload.type === "set-height") {
			setHeight(event.data.payload.height);
		}
	});

	return (
		<div>
			<iframe
				name={screenSize}
				onLoad={onLoad}
				id={id}
				style={{
					width: "100%",
					height: `${height}px`,
					pointerEvents: "none",
				}}
				title="asd"
				ref={ref}
				src={`/iframe.html?id=page--default&viewMode=story#${screenSize}`}
				frameBorder="0"
			/>
		</div>
	);
};
