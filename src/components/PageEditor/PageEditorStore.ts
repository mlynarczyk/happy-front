import { create } from "zustand";
import type { ScreenSize } from "../Page/ScreenSize";

type BaseTarget = {
	uuid: string;
	rect: DOMRect;
	frameName: ScreenSize;
};

export type ScreenSizeTarget = BaseTarget & {
	type: "screen-size";
	payload: ScreenSize;
};

export type TargetTarget = BaseTarget & {
	type: "target";
};

export type Target = ScreenSizeTarget | TargetTarget;

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type PageEditorStore = {
	targets: Target[];
	upsertTarget: (target: Target) => void;
	removeTarget: (target: Optional<Target, "rect">) => void;
};

export const usePageEditorStore = create<PageEditorStore>()((set) => ({
	targets: [],
	upsertTarget: (newTarget) => {
		set(({ targets }) => {
			const index = targets.findIndex(
				(target) => target.uuid === newTarget.uuid,
			);

			if (index !== -1) {
				return {
					targets: targets.with(index, newTarget),
				};
			}

			return {
				targets: [...targets, newTarget],
			};
		});
	},
	removeTarget: (removedTarget) => {
		set(({ targets }) => {
			return {
				targets: targets.filter((target) => {
					return target.uuid !== removedTarget.uuid;
				}),
			};
		});
	},
}));
