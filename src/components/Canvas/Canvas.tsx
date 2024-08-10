import createCache, { type Options } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import styled from "@emotion/styled";
import weakMemoize from "@emotion/weak-memoize";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import type { TPage } from "../../types/TPage";
import { HeadsUpDisplay } from "../HeadsUpDisplay/HeadsUpDisplay";
import { ScreenSize } from "../Page/ScreenSize";
import { CanvasDebugger } from "./CanvasDebugger/CanvasDebugger";
import { CanvasInitializer } from "./CanvasInitializer";
import { useCanvasStore } from "./CanvasStore";
import { CanvasToolbar } from "./CanvasToolbar";
import { useInitialCanvasPosition } from "./useInitialCanvasPosition";

export const BREAKPOINT_SPACING = 250;

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
		background-color: #f9f9f9;
		
		min-width: 100vw;
  }
`;

export const Canvas: React.FC<{
	page: TPage;
}> = ({ page }) => {
	const transformWrapperRef = useCanvasStore(
		({ transformWrapperRef }) => transformWrapperRef,
	);

	const visibleScreenSizes = useCanvasStore(({ screenSizes }) => screenSizes);

	const { offsetY, offsetX, scale } = useInitialCanvasPosition();

	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		const fitContentToViewport = () => {
			if (!transformWrapperRef.current) return;

			setTimeout(() => {
				if (!transformWrapperRef.current) return;

				transformWrapperRef.current.setTransform(offsetX, offsetY, scale, 0);
				setShowContent(true);
			}, 0);
		};

		fitContentToViewport();
	}, [scale, offsetY, offsetX, transformWrapperRef]);

	if (typeof window === "undefined") return;

	return (
		<CanvasWrapper>
			<CanvasInitializer />
			<TransformWrapper
				// doubleClick={{ disabled: true }}
				ref={transformWrapperRef}
				centerOnInit
				maxScale={2}
				minScale={0.2}
				limitToBounds={false}
				wheel={{
					wheelDisabled: true,
				}}
				panning={{
					wheelPanning: true,
				}}
			>
				<HeadsUpDisplay />

				<TransformComponent
					wrapperStyle={{
						visibility: showContent ? "visible" : "hidden",
					}}
					wrapperClass="canvas-wrapper"
					contentClass="canvas-content"
				>
					<div
						id={"screen-sizes"}
						style={{
							display: "flex",
							gap: `${BREAKPOINT_SPACING}px`,
							padding: `${BREAKPOINT_SPACING}px`,
						}}
					>
						{visibleScreenSizes.map((screenSize) => (
							<ScreenSize screenSize={screenSize} key={screenSize.uuid} />
						))}
					</div>
				</TransformComponent>

				<CanvasDebugger />

				<CanvasToolbar />
			</TransformWrapper>
		</CanvasWrapper>
	);
};
