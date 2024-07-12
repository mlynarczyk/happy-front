import { findIndex, insert, pipe, updateAt } from "remeda";
import { create } from "zustand";

export type Target = {
	uuid: string;
	type: "ScreenSize" | "Target";
	rect: DOMRect;
};

export type PageEditorStore = {
	targets: Target[];
	addTarget: (target: Target) => void;
	removeTarget: (target: Target) => void;
};

export const usePageEditorStore = create<PageEditorStore>()((set) => ({
	targets: [],
	addTarget: (newTarget) => {
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
