class TooltipExample extends React.Component {

  displayName: "TooltipExample"

  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return (
      <div>
        <div ref="tooltipOnHover" className="slds-p-horizontal--medium" style={{ "display": "inline-block"}}>
          <SLDSTooltip
            align="top"
            content={<span>Tooltip on top</span>}
            targetElement={this.refs.tooltipOnHover}>
              <a href="javascript:void(0)">
                <SLDSIcon assistiveText="info" category="utility" name="info" className="slds-icon-text-default" />
              </a>
            </SLDSTooltip>
        </div>

        <div ref="tooltipOnClick" className="slds-p-horizontal--medium" style={{ "display": "inline-block"}}>
          <SLDSTooltip
            key="tooltipDemo"
            align="right"
            content={<span>Tooltip with right alignment</span>}
            targetElement={this.refs.tooltipOnClick}>
              <SLDSButton variant="brand" label="Hover to Open" />
            </SLDSTooltip>
        </div>
      </div>
    );
  }

}

React.render(<TooltipExample />, mountNode);

