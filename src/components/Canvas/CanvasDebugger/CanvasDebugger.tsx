import type React from "react";
import { useTransformContext } from "react-zoom-pan-pinch";
import { useCanvasStore } from "../CanvasStore";
import * as S from "./CanvasDebugger.styles";

export const CanvasDebugger: React.FC = () => {
	const context = useTransformContext();

	const targets = useCanvasStore(({ targets }) => {
		return targets;
	});

	// useTransformEffect((context) => {
	// 	console.log(context.state);
	// });

	// useEffect(() => {
	// 	console.log(targets);
	// }, [targets]);

	const transformState = (() => {
		return Object.entries(context.transformState);
	})();

	const bounds = (() => {
		return JSON.stringify(context.bounds);
	})();

	const setup = (() => {
		return JSON.stringify(context.setup);
	})();

	return (
		<S.CanvasDebugger>
			asd
			{transformState}
			{/*{bounds}*/}
			{/*{setup}*/}
		</S.CanvasDebugger>
	);
};
