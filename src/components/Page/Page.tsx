import styled from "@emotion/styled";
import React, { useRef } from "react";
import { Section } from "./Section";

import { useDebounceCallback, useResizeObserver } from "usehooks-ts";
import {
	SET_HEIGHT_TYPE,
	sendChildOriginMessage,
} from "../PageEditor/PageFrame/FrameBridgeApi";

const FakeBody = styled.div`
	--text-size-xs: 0.64rem;
	--text-size-sm: 0.8rem;
	--text-size-md: 1rem;
	--text-size-lg: 1.25rem;
	--text-size-xl: 1.56rem;
	--text-size-2xl: 1.95rem;
	--text-size-3xl: 2.44rem;
	--text-size-4xl: 3.05rem;
	--text-size-5xl: 3.81rem;
`;

const Main = styled.div`
  background-color: #0064E6;

	font-family: 'Helvetica Neue', Arial, sans-serif;
	font-size: 20px;
	line-height: 1.65;
	color: #f7f7f7;

	p {
		font-size: 1em;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		line-height: 1.15;
		font-weight: 700;
	}

	h1 {
		font-family: 'Open Sans', sans-serif;
		margin-top: 0;
		font-size: var(--text-size-5xl);
	}

	h2 {
		font-size: var(--text-size-4xl);
	}

	h3 { font-size: var(--text-size-3xl); }

	h4 { font-size: var(--text-size-2xl); }

	h5 { font-size: var(--text-size-xl); }
	
	h6 {
		font-size: var(--text-size-lg);
	}

	small {
		font-size: 0.64em;
	}
`;

const Title = styled.h1`
	font-size: 2.5rem;
	font-weight: bold;
	margin-bottom: 5rem;
`;

const Subtitle = styled.h2`
	font-size: 1.5rem;
	font-weight: 300;
	margin-bottom: 3rem;
`;

const Paragraph = styled.p`
	font-size: var(--text-size-md);
	margin-bottom: 10px;
`;

export const Page = () => {
	const ref = useRef<HTMLDivElement | null>(null);

	const setSize = (size: {
		width: number | undefined;
		height: number | undefined;
	}) => {
		sendChildOriginMessage(window.parent, {
			type: SET_HEIGHT_TYPE,
			payload: {
				height: size.height || 0,
			},
		});
	};

	const onResize = useDebounceCallback(setSize, 200);

	const { width = 0, height = 0 } = useResizeObserver({
		ref,
		onResize,
		box: "border-box",
	});

	return (
		<FakeBody ref={ref}>
			<Main>
				<Section>
					<Title>Jane Doe</Title>
					<Subtitle>UI/UX Designer</Subtitle>
					<Paragraph>
						I am a passionate UI/UX designer with over 10 years of experience in
						creating engaging and user-friendly digital experiences. My work
						focuses on solving complex problems through elegant, intuitive
						designs.
					</Paragraph>
				</Section>
				<Section>
					<Subtitle>About Me</Subtitle>
					<Paragraph>
						With a background in graphic design and a keen eye for detail, I
						transitioned into the field of UI/UX design to merge my love for art
						with technology. I believe that design is not just about aesthetics,
						but about creating meaningful experiences that resonate with users.
					</Paragraph>
					<Paragraph>
						Throughout my career, I have worked with various clients ranging
						from startups to established companies, helping them to achieve
						their design goals and improve user satisfaction.
					</Paragraph>
				</Section>
				<Section>
					<Subtitle>Experience</Subtitle>
					<Paragraph>
						<strong>Senior UI/UX Designer at TechCorp</strong> (2018 - Present)
						<br /> Leading the design team in developing innovative solutions
						for web and mobile applications. Key projects include redesigning
						the company’s main product, resulting in a 30% increase in user
						engagement.
					</Paragraph>
					<Paragraph>
						<strong>UI/UX Designer at Creative Solutions</strong> (2013 - 2018)
						<br /> Collaborated with cross-functional teams to create
						user-friendly interfaces for a variety of digital products. Played a
						crucial role in the design of an award-winning app for a major
						client.
					</Paragraph>
				</Section>
				<Section>
					<Subtitle>Skills</Subtitle>
					<Paragraph>
						- User Research & Analysis
						<br /> - Wireframing & Prototyping
						<br /> - Interaction Design
						<br /> - Visual Design
						<br /> - Usability Testing
						<br /> - Design Systems
						<br /> - Tools: Sketch, Figma, Adobe XD, InVision, Zeplin
					</Paragraph>
				</Section>
				<Section>
					<Subtitle>Projects</Subtitle>
					<Paragraph>
						<strong>Project Name 1</strong>
						<br /> Description of the project, the role played, and the outcome
						or impact of the project.
					</Paragraph>
					<Paragraph>
						<strong>Project Name 2</strong>
						<br /> Description of the project, the role played, and the outcome
						or impact of the project.
					</Paragraph>
					<Paragraph>
						<strong>Project Name 3</strong>
						<br /> Description of the project, the role played, and the outcome
						or impact of the project.
					</Paragraph>
				</Section>
			</Main>
		</FakeBody>
	);
};
