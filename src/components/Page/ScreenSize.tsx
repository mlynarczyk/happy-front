import type React from "react";
import { useState } from "react";
import { uuid } from "../../utils/uuid";
import { BREAKPOINT_SPACING } from "../Canvas/Canvas";
import { PageFrame } from "../PageEditor/PageFrame/PageFrame";
import { ScreenSizeReporter } from "./ScreenSizeReporter";

export type ScreenSize = {
	uuid: string;
	width: number;
};

export type PageProps = {
	screenSize: ScreenSize;
};

export const SCREEN_SIZES: ScreenSize[] = [
	{
		uuid: uuid(),
		width: 1080,
	},
	{
		uuid: uuid(),
		width: 375,
	},
	{
		uuid: uuid(),
		width: 1440,
	},
];

export const ScreenSize: React.FC<PageProps> = ({ screenSize }) => {
	const [ref, setRef] = useState<HTMLDivElement | null>(null);

	return (
		<div
			ref={setRef}
			style={{
				position: "relative",
				width: screenSize.width,
				height: "fit-content",
				boxShadow: `5px 5px calc(.1*${BREAKPOINT_SPACING}px)rgba(0,0,0,.1019607843)`,
				backgroundColor: "#fff",
			}}
		>
			<ScreenSizeReporter trackedElement={ref} screenSize={screenSize} />

			<PageFrame screenSize={screenSize} />
		</div>
	);
};
