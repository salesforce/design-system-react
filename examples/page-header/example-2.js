import SLDSPageHeader from 'design-system-react/components/page-header';
import SLDSButton from 'design-system-react/components/button';
import SLDSButtonGroup from 'design-system-react/components/button-group';

const PageHeaderExample = React.createClass({
	render() {
		const contentRight = (
			<div>
				<ButtonStateful
					key="PageHeaderFollowButton"
					disabled={false}
					iconSize="medium"
					responsive={false}
					stateOne={{ iconName: "add", label: "Follow" }}
					stateTwo={{ iconName: "check", label: "Following" }}
					stateThree={{ iconName: "close", label: "Unfollow" }} />
				<ButtonGroup key="">
					<Button
						label="Edit" />
					<Button
						label="Delete" />
					<Button
						label="Clone" />
					<Button
						iconName="down"
						assistiveText="More" />
				</ButtonGroup>
			</div>
		);

		const details = [
			{ label: 'Field 1', content: 'Description that demonstrates truncation with content.' },
			{ label: 'Field 2', content: 'Multiple Values' },
			{ label: 'Field 3', content: (<a href="#">Hyperlink</a>) },
			{ label: 'Field 4', content: 'Description (2-line truncation)' },
		];

		return (
			<PageHeader
				iconAssistiveText="User"
				iconCategory="standard"
				iconName="user"
				label="Record Type"
				title="Record Title"
				variant="recordHome"
				contentRight={contentRight}
				details={details} />
		);
	}
});

ReactDOM.render(<PageHeaderExample />, mountNode);
