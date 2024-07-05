import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs";

export const Editor: React.FC = () => {
	return (
		<div>
			<Tabs>
				<TabList>
					<Tab>Notes</Tab> <Tab>Lists</Tab> <Tab>Map</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>Uno content</TabPanel> <TabPanel>Dos content</TabPanel>
				</TabPanels>
			</Tabs>
			Editor
		</div>
	);
};
