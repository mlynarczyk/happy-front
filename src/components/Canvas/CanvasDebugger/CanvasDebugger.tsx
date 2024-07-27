import type React from "react";
import { useEffect } from "react";
import {
	useTransformComponent,
	useTransformContext,
	useTransformEffect,
} from "react-zoom-pan-pinch";
import { usePageEditorStore } from "../../PageEditor/PageEditorStore";
import * as S from "./CanvasDebugger.styles";

export const CanvasDebugger: React.FC = () => {
	const context = useTransformContext();

	const targets = usePageEditorStore(({ targets }) => {
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
