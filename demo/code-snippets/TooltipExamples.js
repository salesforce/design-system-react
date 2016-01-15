const moreOptions = [
  {label:'undo',value:'A0'},
  {label:'redo',value:'B0'},
  {label:'activate',value:'C0'},
];

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
          <SLDSPopoverTooltip
            align="top"
            content={<span>Tooltip on top</span>}
            targetElement={this.refs.tooltipOnHover}>
              <a href="javascript:void(0)">
                <SLDSIcon assistiveText="info" category="utility" name="info" className="slds-icon-text-default" />
              </a>
            </SLDSPopoverTooltip>
        </div>

        <div ref="tooltipOnClick" className="slds-p-horizontal--medium" style={{ "display": "inline-block"}}>
          <SLDSPopoverTooltip
            key="tooltipDemo"
            align="right"
            content={<span>Tooltip with right alignment</span>}
            targetElement={this.refs.tooltipOnClick}>
              <SLDSButton variant="brand" label="Hover to Open" />
            </SLDSPopoverTooltip>
        </div>




        <div style={{margin:'10rem'}}>
        <SLDSButtonGroup className="slds-p-bottom--medium">
          <SLDSButton
            label="Refresh"
            variant="neutral" 
            tooltip={<SLDSPopoverTooltip 
              content="Buttonbar Tooltip"
              align="bottom" 
              openByDefault={true}></SLDSPopoverTooltip>}
          />

          <SLDSButton
            label="Edit"
            variant="neutral"
            tooltip={<SLDSPopoverTooltip 
              content="Buttonbar Tooltip"
              align="bottom" 
              openByDefault={true}></SLDSPopoverTooltip>}
          />

          <SLDSMenuDropdown
            assistiveText="More Options"
            iconName="down"
            iconVariant="border-filled"
            openOn="hover"
            options={moreOptions}
            variant="icon" 
            tooltip={<SLDSPopoverTooltip 
              content="Dropdown Tooltip"
              align="top" 
              openByDefault={true}></SLDSPopoverTooltip>}
          />

        </SLDSButtonGroup>

      </div>



      </div>
    );
  }

}

React.render(<TooltipExample />, mountNode);

