import { makeDecorator } from "@storybook/preview-api";
import type * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // default: true
		},
	},
});

export const withQueryClientProvider = makeDecorator({
	name: "withQueryClient",
	parameterName: "queryClientProvider",
	wrapper: (getStory, context) => {
		const storyElement = getStory(context) as React.ReactNode;

		return (
			<QueryClientProvider client={queryClient}>
				{storyElement}
			</QueryClientProvider>
		);
	},
});
