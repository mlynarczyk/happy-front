import type { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { ScreenSize } from "./ScreenSize";

export default {
	title: "ScreenSize",
	component: ScreenSize,
	parameters: {
		jest: ["ScreenSize"],
		componentSubtitle: "",
	},
} as Meta<typeof ScreenSize>;

const Template: StoryFn<typeof ScreenSize> = (args) => {
	return <ScreenSize {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
