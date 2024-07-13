import type React from "react";
import { useCanvasStore } from "../../Canvas/CanvasStore";
import { SCREEN_SIZES } from "../../Page/ScreenSize";
import type {
	ScreenSizeTarget,
	Target,
} from "../../PageEditor/PageEditorStore";

export const ScreenSizeHud: React.FC<{
	target: ScreenSizeTarget;
}> = ({ target }) => {
	const { addScreenSize, removeScreenSize } = useCanvasStore(
		({ addScreenSize, removeScreenSize }) => ({
			addScreenSize,
			removeScreenSize,
		}),
	);

	return (
		<div
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

			<div
				style={{
					position: "absolute",
					left: 0,
					top: -48,
					backgroundColor: "#E6E6E6",
					borderRadius: "4px",
					minWidth: "calc(100% - 16px)",
					padding: "8px",
					display: "flex",
					gap: "8px",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div>{`${SCREEN_SIZES[target.payload].width}px`}</div>

				<div
					style={{
						display: "flex",
						gap: "8px",
					}}
				>
					<button
						type="button"
						onClick={addScreenSize}
						style={{
							pointerEvents: "all",
						}}
					>
						Add
					</button>

					<button
						type="button"
						onClick={() => {
							removeScreenSize(target.payload);
						}}
						style={{
							pointerEvents: "all",
						}}
					>
						Remove
					</button>
				</div>
			</div>
		</div>
	);
};
