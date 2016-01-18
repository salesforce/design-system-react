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




        <div style={{margin:'5rem'}}>
          <SLDSButtonGroup className="slds-p-bottom--medium">
            <SLDSButton
              label="Refresh"
              variant="neutral"
              tooltip={<SLDSPopoverTooltip
                align="top"
                content="Buttonbar Tooltip"
                openByDefault={false}></SLDSPopoverTooltip>}
            />

            <SLDSButton
              label="Edit"
              variant="neutral"
              tooltip={<SLDSPopoverTooltip
                align="top right"
                content="Buttonbar Tooltip"
                openByDefault={false}></SLDSPopoverTooltip>}
            />

            <SLDSMenuDropdown
              assistiveText="More Options"
              buttonVariant="icon"
              iconName="down"
              iconVariant="border-filled"
              openOn="hover"
              options={moreOptions}
              tooltip={<SLDSPopoverTooltip
                align="top right"
                content="Dropdown Tooltip"
                openByDefault={false}></SLDSPopoverTooltip>}
            />

        </SLDSButtonGroup>

      </div>



        <div style={{margin:'5rem'}}>
          <SLDSButtonGroup className="slds-p-bottom--medium">
            <SLDSButton
              label="Refresh"
              variant="neutral"
              tooltip={<SLDSPopoverTooltip
                align="bottom"
                content="Buttonbar Tooltip"
                openByDefault={false}></SLDSPopoverTooltip>}
            />

            <SLDSButton
              label="Edit"
              variant="neutral"
              tooltip={<SLDSPopoverTooltip
                align="bottom right"
                content="Buttonbar Tooltip"
                openByDefault={false}></SLDSPopoverTooltip>}
            />

            <SLDSMenuDropdown
              assistiveText="More Options"
              buttonVariant="icon"
              iconName="down"
              iconVariant="border-filled"
              openOn="click"
              options={moreOptions}
              tooltip={<SLDSPopoverTooltip
                align="bottom right"
                content="Dropdown Tooltip"
                openByDefault={false}></SLDSPopoverTooltip>}
            />

        </SLDSButtonGroup>
      </div>


        <div style={{margin:'5rem'}}>
          <SLDSPopoverTooltip
            align="right"
            openByDefault={false}
            content={<span>Tooltip on right</span>}>
              <div style={{backgroundColor:'gray'}}>
                right<br />
                right<br />
                right
              </div>
          </SLDSPopoverTooltip>
        </div>

        <div style={{margin:'5rem'}}>
          <SLDSPopoverTooltip
            align="left"
            openByDefault={false}
            content={<span>Tooltip on left</span>}>
              <div style={{backgroundColor:'gray'}}>
                left<br />
                left<br />
                left
              </div>
            </SLDSPopoverTooltip>
        </div>

        <div style={{margin:'5rem'}}>
          <SLDSPopoverTooltip
            align="bottom"
            openByDefault={false}
            content={<span>Tooltip on bottom</span>}>
              <div style={{backgroundColor:'gray'}}>
                bottom<br />
                bottom<br />
                bottom
              </div>
            </SLDSPopoverTooltip>
        </div>

        <div style={{margin:'5rem'}}>
          <SLDSPopoverTooltip
            align="top"
            openByDefault={false}
            content={<span>Tooltip on top</span>}>
              <div style={{backgroundColor:'gray'}}>
                top<br />
                top<br />
                top
              </div>
            </SLDSPopoverTooltip>
        </div>

        <div style={{margin:'5rem'}}>
          <SLDSPopoverTooltip
            align="top left"
            openByDefault={false}
            content={<span>Tooltip on top left</span>}>
              <div style={{backgroundColor:'gray'}}>
                top left<br />
                top left<br />
                top left
              </div>
            </SLDSPopoverTooltip>
        </div>

        <div style={{margin:'5rem'}}>
          <SLDSPopoverTooltip
            align="top right"
            openByDefault={false}
            content={<span>Tooltip on top right</span>}>
              <div style={{backgroundColor:'gray'}}>
                top right<br />
                top right<br />
                top right
              </div>
            </SLDSPopoverTooltip>
        </div>

        <div style={{margin:'5rem'}}>
          <SLDSPopoverTooltip
            align="bottom left"
            openByDefault={false}
            content={<span>Tooltip on bottom left</span>}>
              <div style={{backgroundColor:'gray'}}>
                bottom left<br />
                bottom left<br />
                bottom left
              </div>
            </SLDSPopoverTooltip>
        </div>

        <div style={{margin:'5rem'}}>
          <SLDSPopoverTooltip
            align="bottom right"
            openByDefault={false}
            content={<span>Tooltip on bottom right</span>}>
              <div style={{backgroundColor:'gray'}}>
                bottom right<br />
                bottom right<br />
                bottom right
              </div>
            </SLDSPopoverTooltip>
        </div>


      </div>
    );
  }

}

React.render(<TooltipExample />, mountNode);

