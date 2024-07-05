import { css } from "@emotion/react";
import type { TPage } from "../../types/TPage";
import { Canvas } from "../Canvas/Canvas";

export const PageEditor: React.FC<{
	page: TPage;
}> = ({ page }) => {
	return <Canvas page={page} />;
};
