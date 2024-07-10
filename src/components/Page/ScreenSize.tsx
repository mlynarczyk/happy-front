import type React from "react";
import { BREAKPOINT_SPACING } from "../Canvas/Canvas";

export type ScreenSize = "phone" | "tablet" | "desktop";

export type PageProps = {
	size: ScreenSize;
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

export const ScreenSize: React.FC<PageProps> = ({ size }) => {
	return (
		<div
			style={{
				...SCREEN_SIZES[size],
				boxShadow: `5px 5px calc(.8*${BREAKPOINT_SPACING}px)rgba(0,0,0,.1019607843)`,
			}}
		>
			Page
		</div>
	);
};
