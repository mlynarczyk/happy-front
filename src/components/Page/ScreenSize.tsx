import type React from "react";
import { useEffect, useState } from "react";
import { uuid } from "../../utils/uuid";
import { BREAKPOINT_SPACING } from "../Canvas/Canvas";
import { useCanvasStore } from "../Canvas/CanvasStore";
import { type Target, usePageEditorStore } from "../PageEditor/PageEditorStore";
import * as S from "./ScreenSize.styles";
import { ScreenSizeReporter } from "./ScreenSizeReporter";

export type ScreenSize = "phone" | "tablet" | "desktop";

export type PageProps = {
	screenSize: ScreenSize;
};

export const SCREEN_SIZES: Record<
	ScreenSize,
	{
		width: number;
		height: number;
	}
> = {
	phone: {
		width: 375,
		height: 16000,
	},
	tablet: {
		width: 1080,
		height: 12000,
	},
	desktop: {
		width: 1440,
		height: 8000,
	},
};

export const ScreenSize: React.FC<PageProps> = ({ screenSize }) => {
	const [ref, setRef] = useState<HTMLDivElement | null>(null);

	const removeScreenSize = useCanvasStore(
		({ removeScreenSize }) => removeScreenSize,
	);

	return (
		<div
			ref={setRef}
			style={{
				position: "relative",
				...SCREEN_SIZES[screenSize],
				boxShadow: `5px 5px calc(.1*${BREAKPOINT_SPACING}px)rgba(0,0,0,.1019607843)`,
				backgroundColor: "#fff",
			}}
		>
			<ScreenSizeReporter trackedElement={ref} />
			Page
			<S.RemoveScreenSizeButton
				type="button"
				onClick={() => {
					console.log("aa");
					removeScreenSize(screenSize);
				}}
			>
				Remove
			</S.RemoveScreenSizeButton>
		</div>
	);
};
