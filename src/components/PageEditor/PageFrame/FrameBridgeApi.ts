import { useRef } from "react";
import { useEventListener } from "usehooks-ts";

const NAMESPACE = "HAPPY" as const;
export const PARENT_FRAME_ORIGIN = `${NAMESPACE}_PARENT_FRAME_ORIGIN` as const;

export const CHILD_FRAME_ORIGIN = `${NAMESPACE}_CHILD_FRAME_ORIGIN` as const;

export type IframeMessage =
	| ({
			origin: typeof PARENT_FRAME_ORIGIN;
	  } & ParentOriginMessageData)
	| ({
			origin: typeof CHILD_FRAME_ORIGIN;
	  } & ChildOriginMessageData);

export const TARGET_TYPE_TARGET = "target" as const;

// Child origin messages
export type ChildOriginMessageData =
	| {
			origin: typeof CHILD_FRAME_ORIGIN;
			type: typeof UPSERT_TARGET_TYPE;
			payload: {
				uuid: string;
				type: typeof TARGET_TYPE_TARGET;
				rect: DOMRect;
			};
	  }
	| {
			origin: typeof CHILD_FRAME_ORIGIN;
			type: typeof REMOVE_TARGET_TYPE;
			payload: {
				uuid: string;
				type: typeof TARGET_TYPE_TARGET;
				rect?: DOMRect;
			};
	  }
	| {
			origin: typeof CHILD_FRAME_ORIGIN;
			type: typeof SET_HEIGHT_TYPE;
			payload: {
				height: number;
			};
	  };

export const UPSERT_TARGET_TYPE = `${NAMESPACE}_UPSERT_TARGET` as const;

export const REMOVE_TARGET_TYPE = `${NAMESPACE}_REMOVE_TARGET` as const;

export const SET_HEIGHT_TYPE = `${NAMESPACE}_SET_HEIGHT` as const;

// Parent origin messages

export const CANVAS_TRANSFORMED = `${NAMESPACE}_CANVAS_TRANSFORMED` as const;

export type ParentOriginMessageData = {
	origin: typeof PARENT_FRAME_ORIGIN;
	type: typeof CANVAS_TRANSFORMED;
};

function makeMessage(message: IframeMessage) {
	return message;
}

export function sendChildOriginMessage<
	T extends Omit<ChildOriginMessageData, "origin">,
>(contentWindow: WindowProxy, data: T) {
	contentWindow.postMessage(
		makeMessage({
			origin: CHILD_FRAME_ORIGIN,
			...data,
		} as ChildOriginMessageData),
	);
}

export function sendParentOriginMessage<
	T extends Omit<ParentOriginMessageData, "origin">,
>(contentWindow: WindowProxy, data: T) {
	contentWindow.postMessage(
		makeMessage({
			origin: PARENT_FRAME_ORIGIN,
			...data,
		}),
	);
}

export const useChildFrameOriginListener = (
	callback: (event: MessageEvent, data: ChildOriginMessageData) => void,
) => {
	const { current: memoizedCallback } = useRef(callback);

	useEventListener("message", (event) => {
		const data = event.data as unknown;

		// @ts-ignore
		if (!data || data?.origin !== CHILD_FRAME_ORIGIN) return;

		memoizedCallback(event, data as ChildOriginMessageData);
	});
};

export const useParentFrameOriginListener = (
	callback: (event: MessageEvent, data: ParentOriginMessageData) => void,
) => {
	const { current: memoizedCallback } = useRef(callback);

	useEventListener("message", (event) => {
		const data = event.data as unknown;

		// @ts-ignore
		if (!data || data.origin !== PARENT_FRAME_ORIGIN) return;

		memoizedCallback(event, data as ParentOriginMessageData);
	});
};
