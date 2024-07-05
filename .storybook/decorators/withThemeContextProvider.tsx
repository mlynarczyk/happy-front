import { makeDecorator } from "@storybook/preview-api";
import { ThemeContextProvider } from "../../src/components/ThemeContextProvider/ThemeContextProvider";

export const withThemeContextProvider = makeDecorator({
	name: "withThemeContextProvider",
	parameterName: "themeContextProvider",
	wrapper: (getStory, context) => {
		const storyElement = getStory(context) as React.ReactNode;

		return <ThemeContextProvider>{storyElement}</ThemeContextProvider>;
	},
});
