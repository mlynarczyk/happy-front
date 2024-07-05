import createCache, { type Options } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import styled from "@emotion/styled";
import weakMemoize from "@emotion/weak-memoize";
import type React from "react";
import { useEffect, useRef } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import {
	type ReactZoomPanPinchRef,
	TransformComponent,
	TransformWrapper,
} from "react-zoom-pan-pinch";

import type { TPage } from "../../types/TPage";
import { CanvasToolbar } from "./CanvasToolbar";

const CanvasWrapper = styled.div`
  .canvas-content {
    display: grid;
    justify-content: center;
    align-items: flex-start;
    //pointer-events: none;

    flex-wrap: wrap;
    width: fit-content;
    height: fit-content;
    margin: 0;
    padding: 0;
    transform-origin: 0% 0%;
  }

  .canvas-wrapper {
    position: relative;
    width: fit-content;
    height: fit-content;
    overflow: hidden;
    user-select: none;
    margin: 0;
    padding: 0;
  }
`;

const StyledIframe = styled(Frame)`
  height: fit-content;
  width: fit-content;
  padding: 0;
  margin: 0;
  border: none;

  html,
  body {
    padding: 0;
    margin: 0;
  }
`;

const memoizedCreateCacheWithContainer = weakMemoize((container) => {
	return createCache({ container, key: "css" } as Options);
});

export const FrameProvider = (props) => (
	<FrameContextConsumer>
		{({ document }) => {
			if (!document) return;

			return (
				<CacheProvider value={memoizedCreateCacheWithContainer(document.head)}>
					{props.children}
				</CacheProvider>
			);
		}}
	</FrameContextConsumer>
);

export const pageSizeMap = {
	a4: {
		width: 210,
		height: 297,
	},
	letter: {
		width: 216,
		height: 279,
	},
};

export const MM_TO_PX = 3.78;

export const Canvas: React.FC<{
	page: TPage;
}> = ({ page }) => {
	const frameRef = useRef<HTMLIFrameElement | null>();

	const transformRef = useRef<ReactZoomPanPinchRef | null>(null);

	const format = "a4";

	const layout = [1];

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			console.log("asd");
			if (event.origin !== window.location.origin) return;

			console.log("asd1");
			if (event.data.type === "ZOOM_IN") transformRef.current?.zoomIn(0.2);
			if (event.data.type === "ZOOM_OUT") transformRef.current?.zoomOut(0.2);
			if (event.data.type === "CENTER_VIEW") transformRef.current?.centerView();
			if (event.data.type === "RESET_VIEW") {
				transformRef.current?.resetTransform(0);
				setTimeout(() => transformRef.current?.centerView(0.8, 0), 10);
			}
		};

		window.addEventListener("message", handleMessage);

		return () => {
			window.removeEventListener("message", handleMessage);
		};
	}, []);

	return (
		<CanvasWrapper>
			<TransformWrapper
				ref={transformRef}
				centerOnInit
				maxScale={2}
				minScale={0.4}
				initialScale={0.8}
				limitToBounds={false}
			>
				<TransformComponent
					wrapperStyle={{
						width: "100vw",
						height: "100vh",
					}}
					wrapperClass="canvas-wrapper"
					contentClass="canvas-content"
					contentStyle={{
						width: `${layout.length * (pageSizeMap[format].width * MM_TO_PX + 42)}px`,
						gridTemplateColumns: `repeat(${layout.length}, 1fr)`,
					}}
				>
					<div
						style={{
							boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
						}}
					>
						<StyledIframe
							ref={frameRef}
							initialContent='<!DOCTYPE html><html><head></head><body style="padding: 0; margin: 0;" id="root"></body></html>'
							mountTarget="#root"
						>
							<FrameProvider>
								<div style={{ width: "100%" }}>
									{page.sections.map((section) => {
										return (
											<div
												style={{
													padding: 40,
												}}
												key={section.uuid}
											>
												{section.uuid}
											</div>
										);
									})}
								</div>
							</FrameProvider>
						</StyledIframe>

						<CanvasToolbar />
					</div>
				</TransformComponent>
			</TransformWrapper>
		</CanvasWrapper>
	);
};
