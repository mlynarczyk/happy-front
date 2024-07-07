import type { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { Breakpoint } from "./Breakpoint";

export default {
	title: "Breakpoint",
	component: Breakpoint,
	parameters: {
		jest: ["Breakpoint"],
		componentSubtitle: "",
	},
} as Meta<typeof Breakpoint>;

const Template: StoryFn<typeof Breakpoint> = (args) => {
	return <Breakpoint {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
