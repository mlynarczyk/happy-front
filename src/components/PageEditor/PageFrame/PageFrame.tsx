import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useTransformEffect } from "react-zoom-pan-pinch";
import { useEventListener } from "usehooks-ts";
import { uuid } from "../../../utils/uuid";
import type { ScreenSize } from "../../Page/ScreenSize";
import {
	CANVAS_TRANSFORMED,
	CHILD_FRAME_ORIGIN,
	type ChildOriginMessageData,
	SET_HEIGHT_TYPE,
	sendParentOriginMessage,
	useChildFrameOriginListener,
	useParentFrameOriginListener,
} from "./FrameBridgeApi";
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

		sendParentOriginMessage(ref.current?.contentWindow, {
			type: CANVAS_TRANSFORMED,
		});
	});

	useChildFrameOriginListener((event, data) => {
		const eventScreenSize = event.source.location.hash.split("#")[1];

		if (screenSize !== eventScreenSize) return;

		if (data.type === SET_HEIGHT_TYPE) {
			console.log("asdasdsss1");
			setHeight(data.payload.height);
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
