import type React from "react";
import { Button } from "../Button";
import { ScreenSize } from "../Page/ScreenSize";
import {
	type ScreenSizeTarget,
	usePageEditorStore,
} from "../PageEditor/PageEditorStore";
import { ScreenSizeHud } from "./ScreenSizeHud/ScreenSizeHud";

export const HeadsUpDisplay: React.FC = () => {
	const targets = usePageEditorStore(({ targets }) => {
		return targets;
	});

	const screenSizeTargets = targets.filter(
		(target) => target.type === "screen-size",
	) as ScreenSizeTarget[];

	const otherTargets = targets.filter((target) => target.type === "target");

	return (
		<div
			data-testid={"heads-up-display"}
			style={{
				position: "relative",
				pointerEvents: "none",
				zIndex: 1,
			}}
		>
			{screenSizeTargets.map((target) => {
				return <ScreenSizeHud key={target.uuid} target={target} />;
			})}

			{otherTargets.map((target) => {
				return (
					<div
						key={target.uuid}
						style={{
							position: "absolute",
							zIndex: 1,
							top: `${target.rect.top}px`,
							left: `${target.rect.left}px`,

							width: `${target.rect.width}px`,
							height: `${target.rect.height}px`,

							border: "1px solid red",
						}}
					>
						{/*{target.uuid}*/}
						{/*<br />*/}
						{target.rect.top}
						<br />
						{target.rect.left}
					</div>
				);
			})}
		</div>
	);
};
