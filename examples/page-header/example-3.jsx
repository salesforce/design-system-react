import SLDSPageHeader from 'design-system-react/components/page-header';
import SLDSButton from 'design-system-react/components/button';
import SLDSButtonGroup from 'design-system-react/components/button-group';

const PageHeaderExample = React.createClass({
	render() {
		const navRight = (
			<div className="slds-button-group" role="group">
				<button className="slds-button slds-button--neutral">New Lead</button>
				<div className="slds-button--last">
					<Button
						iconName="down"
						variant="icon"
						iconVariant="border-filled"
						assistiveText="More Actions" />
				</div>
			</div>
		);

		const contentRight = (
			<div>
				<Button
				 iconName="settings"
				 variant="icon"
				 iconVariant="more"
				 className="slds-m-left--xx-small"
				 assistiveText="Settings" />
			 <Button
				 iconName="table"
				 variant="icon"
				 iconVariant="more"
				 className="slds-m-left--xx-small"
				 assistiveText="Table" />
			 <ButtonGroup>
				 <Button
					 iconName="chart"
					 variant="icon"
					 iconVariant="border"
					 assistiveText="Chart" />
				 <Button
					 iconName="filterList"
					 variant="icon"
					 iconVariant="border"
					 className="slds-m-left--xx-small"
					 assistiveText="Filter List" />
				 <Button
					 iconName="sort"
					 variant="icon"
					 iconVariant="more"
					 className="slds-m-left--xx-small"
					 assistiveText="Sort" />
			 </ButtonGroup>
			</div>
		);

		return (
			<PageHeader
				label="Leads"
				title="My Leads (truncates)"
				navRight={navRight}
				contentRight={contentRight}
				variant="objectHome"
				truncate={true}
				info="10 items • sorted by name" />
		);
	}
});

ReactDOM.render(<PageHeaderExample />, mountNode);
