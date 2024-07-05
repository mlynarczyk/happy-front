import { makeDecorator } from "@storybook/preview-api";
import type * as React from "react";

import { MemoryRouter } from "react-router-dom";
import type { MemoryRouterProps } from "react-router/dist/lib/components";

export const withMemoryRouter = makeDecorator({
	name: "withMemoryRouter",
	parameterName: "memoryRouter",
	wrapper: (getStory, context, { parameters }) => {
		const storyElement = getStory(context) as React.ReactNode;

		const memoryRouterProps = (
			parameters ? parameters.memoryRouter : {}
		) as MemoryRouterProps;

		// noinspection TypeScriptValidateTypes
		return <MemoryRouter {...memoryRouterProps}>{storyElement}</MemoryRouter>;
	},
});
