import type React from "react";
import { BREAKPOINT_SPACING } from "../Canvas/Canvas";

export type PageProps = {
	size: "small" | "medium" | "large";
};

const sizes: Record<
	(typeof PageProps)["size"],
	{
		width: number;
		height: number;
	}
> = {
	small: {
		width: 375,
		height: 2000,
	},
	medium: {
		width: 1080,
		height: 3000,
	},
	large: {
		width: 1920,
		height: 1000,
	},
};

export const Breakpoint: React.FC<PageProps> = ({ size }) => {
	return (
		<div
			style={{
				...sizes[size],
				boxShadow: `5px 5px calc(.8*${BREAKPOINT_SPACING}px)rgba(0,0,0,.1019607843)`,
			}}
		>
			Page
		</div>
	);
};
