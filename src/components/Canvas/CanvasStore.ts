import type { MutableRefObject } from "react";
import { createRef } from "react";
import type { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { create } from "zustand";
import { uuid } from "../../utils/uuid";
import type { ScreenSize } from "../Page/ScreenSize";

type BaseTarget = {
	uuid: string;
	rect: DOMRect;
	screenSize: ScreenSize;
};

export type ScreenSizeTarget = BaseTarget & {
	type: "screen-size";
	payload: ScreenSize;
};
export type TargetTarget = BaseTarget & {
	type: "target";
};
export type Target = ScreenSizeTarget | TargetTarget;

export type CanvasStore = {
	transformWrapperRef: MutableRefObject<ReactZoomPanPinchRef | null>;

	screenSizes: ScreenSize[];
	addScreenSize: (width: number) => void;
	removeScreenSize: (screenSize: ScreenSize) => void;
	isScreenSizePresent: (screenSize: ScreenSize) => ScreenSize | undefined;
	getScreenSize: (uuid: string) => ScreenSize | undefined;

	targets: Target[];
	upsertTarget: (target: Target) => void;
	removeTarget: (target: Omit<Target, "rect">) => void;
};

export const DEFAULT_SCREEN_SIZES = [
	{
		uuid: uuid(),
		width: 1440,
	},
	{
		uuid: uuid(),
		width: 768,
	},
	{
		uuid: uuid(),
		width: 375,
	},
];

export const useCanvasStore = create<CanvasStore>()((setState, getState) => ({
	transformWrapperRef: createRef<ReactZoomPanPinchRef | null>(),
	screenSizes: DEFAULT_SCREEN_SIZES,
	isScreenSizePresent: (screenSize: ScreenSize) => {
		return getState().screenSizes.find((size) => size.uuid === screenSize.uuid);
	},
	addScreenSize: (width: number) => {
		setState(({ screenSizes }) => {
			return {
				screenSizes: [
					...screenSizes,
					{
						uuid: uuid(),
						width,
					},
				],
			};
		});
	},
	removeScreenSize: (screenSizeToRemove) => {
		setState(({ screenSizes, targets }) => {
			if (screenSizes.length === 1) return {};

			return {
				screenSizes: screenSizes.filter(
					(screenSize) => screenSize.uuid !== screenSizeToRemove.uuid,
				),
				targets: targets.filter(
					(target) => target.screenSize.uuid !== screenSizeToRemove.uuid,
				),
			};
		});
	},
	getScreenSize: (uuid: string) => {
		return getState().screenSizes.find((size) => size.uuid === uuid);
	},

	targets: [],
	upsertTarget: (newTarget) => {
		setState(({ targets }) => {
			const index = targets.findIndex(
				(target) => target.uuid === newTarget.uuid,
			);

			if (index !== -1) {
				return {
					// @ts-ignore
					targets: targets.with(index, newTarget),
				};
			}

			return {
				targets: [...targets, newTarget],
			};
		});
	},
	removeTarget: (removedTarget) => {
		setState(({ targets }) => {
			return {
				targets: targets.filter((target) => {
					return target.uuid !== removedTarget.uuid;
				}),
			};
		});
	},
}));
