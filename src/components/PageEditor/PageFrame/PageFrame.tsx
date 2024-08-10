import type React from "react";
import { useRef, useState } from "react";
import { useTransformEffect } from "react-zoom-pan-pinch";
import type { ScreenSize } from "../../Page/ScreenSize";
import {
	CANVAS_TRANSFORMED,
	SET_HEIGHT_TYPE,
	sendParentOriginMessage,
	useChildFrameOriginListener,
} from "./FrameBridgeApi";
import { usePageFrameOutgoingMessages } from "./usePageFrameOutgoingMessages";

export const PageFrame: React.FC<{
	screenSize: ScreenSize;
}> = ({ screenSize }) => {
	const ref = useRef<HTMLIFrameElement | null>(null);
	const [height, setHeight] = useState(0);

	const onLoad = () => {
		if (!ref.current?.contentWindow) return;

		const height = ref.current.contentWindow.document.body.scrollHeight;

		setHeight(height);
	};

	usePageFrameOutgoingMessages(screenSize);

	useTransformEffect(() => {
		if (!ref.current) return;

		// @ts-ignore
		sendParentOriginMessage(ref.current?.contentWindow, {
			type: CANVAS_TRANSFORMED,
		});
	});

	useChildFrameOriginListener((event, data) => {
		// @ts-ignore
		const eventScreenSizeUuid = event.source.location.hash.split(
			"#",
		)[1] as string;

		if (screenSize.uuid !== eventScreenSizeUuid) return;

		if (data.type === SET_HEIGHT_TYPE) {
			setHeight(data.payload.height);
		}
	});

	return (
		<div>
			<iframe
				name={screenSize.uuid}
				onLoad={onLoad}
				style={{
					width: "100%",
					height: `${height}px`,
					pointerEvents: "none",
				}}
				title="asd"
				ref={ref}
				src={`/iframe.html?id=page--default&viewMode=story#${screenSize.uuid}`}
			/>
		</div>
	);
};
