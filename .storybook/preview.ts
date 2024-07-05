import type { Preview } from "@storybook/react";
import { withMemoryRouter } from "./decorators/withMemoryRouter";
import { withQueryClientProvider } from "./decorators/withQueryClientProvider";
import { withThemeContextProvider } from "./decorators/withThemeContextProvider";

import { initialize as mswInitialize, mswLoader } from "msw-storybook-addon";

const decorators = [
	withMemoryRouter,
	withThemeContextProvider,
	withQueryClientProvider,
];

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	loaders: [mswLoader],
	decorators,
};

export default preview;
