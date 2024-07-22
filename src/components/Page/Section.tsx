import styled from "@emotion/styled";
import type React from "react";
import { useState } from "react";
import { ElementReporter } from "./ElementReporter";

const StyledSection = styled.section`
	padding-top: 80px;
	padding-bottom: 80px;
`;

const StyledWidth = styled.div`
	max-width: 800px;
	text-align: left;
	margin: 0 auto;
`;

export const Section: React.FC = ({ children }) => {
	const [ref, setRef] = useState<HTMLElement | null>(null);

	return (
		<StyledSection ref={setRef}>
			<ElementReporter trackedElement={ref} />
			<StyledWidth>{children}</StyledWidth>
		</StyledSection>
	);
};
