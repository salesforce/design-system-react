class PageHeaderExample extends React.Component {

  render() {
    const contentRight = (
      <div>
        <SLDSButtonStateful
          key="PageHeaderFollowButton"
          disabled={false}
          iconSize="medium"
          responsive={false}
          stateOne={{ iconName: "add", label: "Follow" }}
          stateTwo={{ iconName: "check", label: "Following" }}
          stateThree={{ iconName: "close", label: "Unfollow" }} />
        <SLDSButtonGroup key="">
          <SLDSButton
            label="Edit" />
          <SLDSButton
            label="Delete" />
          <SLDSButton
            label="Clone" />
          <SLDSButton
            iconName="down"
            assistiveText="More" />
        </SLDSButtonGroup>
      </div>
    );

    const details = [
      { label: 'Field 1', content: 'Description that demonstrates truncation with content.' },
      { label: 'Field 2', content: 'Multiple Values' },
      { label: 'Field 3', content: (<a href="#">Hyperlink</a>) },
      { label: 'Field 4', content: 'Description (2-line truncation)' },
    ];

    return (
      <SLDSPageHeader
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
}

ReactDOM.render(<PageHeaderExample />, mountNode);
