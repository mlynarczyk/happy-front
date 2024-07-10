import type React from "react";
import { useEffect } from "react";
import {
	useTransformComponent,
	useTransformContext,
} from "react-zoom-pan-pinch";
import * as S from "./CanvasDebugger.styles";

export const CanvasDebugger: React.FC = () => {
	const context = useTransformContext();

	const state = useTransformComponent((state) => {
		console.log(state);
	});

	useEffect(() => {
		console.log(context);
	});

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
