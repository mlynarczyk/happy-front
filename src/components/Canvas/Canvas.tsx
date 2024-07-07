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
import { Breakpoint } from "../Page/Breakpoint";
import { useCanvasStore } from "./CanvasStore";
import { CanvasToolbar } from "./CanvasToolbar";

export const BREAKPOINT_SPACING = 200;

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
	const transformWrapperRef = useCanvasStore(
		({ transformWrapperRef }) => transformWrapperRef,
	);

	const format = "a4";

	const layout = [1];

	return (
		<CanvasWrapper>
			<TransformWrapper
				ref={transformWrapperRef}
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
							display: "flex",
							gap: `${BREAKPOINT_SPACING}px`,
							padding: `${BREAKPOINT_SPACING}px`,
						}}
					>
						<Breakpoint size={"large"} />

						<Breakpoint size={"medium"} />

						<Breakpoint size={"small"} />
					</div>
				</TransformComponent>
			</TransformWrapper>
			<CanvasToolbar />
		</CanvasWrapper>
	);
};
