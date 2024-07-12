import { css } from "@emotion/react";
import type { TPage } from "../../types/TPage";
import { Canvas } from "../Canvas/Canvas";
import { HeadsUpDisplay } from "../HeadsUpDisplay/HeadsUpDisplay";

export const PageEditor: React.FC<{
	page: TPage;
}> = ({ page }) => {
	return (
		<div>
			<HeadsUpDisplay />
			<Canvas page={page} />
		</div>
	);
};
