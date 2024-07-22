import type { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { Page } from "./Page";

export default {
	title: "Page",
	component: Page,
	parameters: {
		jest: ["Page"],
		componentSubtitle: "",
	},
} as Meta<typeof Page>;

const Template: StoryFn<typeof Page> = (args) => {
	return <Page {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
