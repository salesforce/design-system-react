class PageHeaderExample extends React.Component {

  render(){
    return (
      <SLDSPageHeader
        iconAssistiveText="Opportunity"
        iconCategory="standard"
        iconName="opportunity"
        title="Rohde Corp - 80,000 Widgets"
        info="Mark Jaeckal • Unlimited Customer • 11/13/15" />
    );
  }

}

ReactDOM.render(<PageHeaderExample />, mountNode);
