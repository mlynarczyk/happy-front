import { css } from "@emotion/react";
import type { TPage } from "../../types/TPage";
import { Canvas } from "../Canvas/Canvas";
import { HeadsUpDisplay } from "../HeadsUpDisplay/HeadsUpDisplay";
import { TopNavigation } from "./TopNavigation/TopNavigation";

export const PageEditor: React.FC<{
	page: TPage;
}> = ({ page }) => {
	if (typeof window === "undefined") return;

	return (
		<div>
			<TopNavigation />
			<HeadsUpDisplay />
			<Canvas page={page} />
		</div>
	);
};
