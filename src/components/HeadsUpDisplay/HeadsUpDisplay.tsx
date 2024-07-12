import type React from "react";
import { usePageEditorStore } from "../PageEditor/PageEditorStore";

export const HeadsUpDisplay: React.FC = () => {
	const targets = usePageEditorStore(({ targets }) => {
		return targets;
	});

	console.log(targets);

	return (
		<div
			data-testid={"heads-up-display"}
			style={{
				position: "relative",
				pointerEvents: "none",
				zIndex: 1,
			}}
		>
			<div>hud on</div>

			{targets.map((target) => {
				return (
					<div
						key={target.uuid}
						style={{
							position: "absolute",

							top: `${target.rect.top}px`,
							left: `${target.rect.left}px`,

							width: `${target.rect.width}px`,
							height: `${target.rect.height}px`,

							border: "1px solid #000",
						}}
					>
						{target.uuid}
						<br />
						{target.rect.top}
						<br />
						{target.rect.left}
					</div>
				);
			})}
		</div>
	);
};
