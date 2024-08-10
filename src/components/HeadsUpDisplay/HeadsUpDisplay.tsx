import type React from "react";
import { useTransformContext } from "react-zoom-pan-pinch";
import { type ScreenSizeTarget, useCanvasStore } from "../Canvas/CanvasStore";
import { ScreenSizeHud } from "./ScreenSizeHud/ScreenSizeHud";

export const HeadsUpDisplay: React.FC = () => {
	const { transformState } = useTransformContext();

	const targets = useCanvasStore(({ targets }) => {
		return targets;
	});

	const screenSizeTargets = targets.filter(
		(target) => target.type === "screen-size",
	) as ScreenSizeTarget[];

	const otherTargets = targets.filter((target) => target.type === "target");

	const adjustedOtherTargets = otherTargets
		.map((otherTarget) => {
			const screenSizeTarget = screenSizeTargets.find(
				(screenTarget) =>
					screenTarget.screenSize.uuid === otherTarget.screenSize.uuid,
			);

			if (!screenSizeTarget) throw new Error("Missing screenSize target");

			const scale = transformState.scale;
			const adjustedTop =
				screenSizeTarget.rect.top + otherTarget.rect.top * scale;
			const adjustedLeft = screenSizeTarget.rect.left;

			return {
				...otherTarget,
				adjustedTop,
				adjustedLeft,
				scale,
			};
		})
		.filter((x) => x !== null);

	return (
		<div
			data-testid={"heads-up-display"}
			style={{
				position: "relative",
				pointerEvents: "none",
				zIndex: 1,
			}}
		>
			<div data-testid={"heads-up-display-screen-size-target"}>
				{screenSizeTargets.map((target) => {
					return <ScreenSizeHud key={target.uuid} target={target} />;
				})}
			</div>

			<div data-testid={"heads-up-display-screen-target-target"}>
				{adjustedOtherTargets.map((adjustedTarget) => {
					const { uuid, rect, adjustedTop, adjustedLeft, scale } =
						adjustedTarget;

					return (
						<div
							key={uuid}
							style={{
								position: "absolute",
								zIndex: 1,
								top: `${adjustedTop}px`,
								left: `${adjustedLeft}px`,
								width: `${rect.width * scale}px`,
								height: `${rect.height * scale}px`,
								border: "1px solid red",
							}}
						>
							{rect.top}
							<br />
							{rect.left}
						</div>
					);
				})}
			</div>
		</div>
	);
};
