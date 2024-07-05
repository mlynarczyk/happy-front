import type { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { PageMock } from "../../mocks/mocks";
import { PageEditor } from "./PageEditor";

export default {
	title: "PageEditor",
	component: PageEditor,
	parameters: {
		jest: ["PageEditor"],
		componentSubtitle: "",
	},
} as Meta<typeof PageEditor>;

const Template: StoryFn<typeof PageEditor> = (args) => {
	return <PageEditor {...args} />;
};

export const Default = Template.bind({});
Default.args = {
	page: PageMock,
};
