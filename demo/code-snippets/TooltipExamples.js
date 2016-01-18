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

      <div style={{
            margin:'5rem'
      }}>

      <div className="slds-grid">
        <div className="slds-col">
          <div style={{
            margin:'1rem'
          }}>
            <SLDSPopoverTooltip
              align="left"
              content={<span>Tooltip on left</span>}>
                <div style={{
                  backgroundColor:'lightGray',
                  padding:'2rem'
                }}>
                  tooltip on hover: position
                  left
                </div>
              </SLDSPopoverTooltip>
          </div>
        </div>
        <div className="slds-col">
          <div style={{
            margin:'1rem'
          }}>
            <SLDSPopoverTooltip
              align="right"
              content={<span>Tooltip on right</span>}>
                <div style={{
                  backgroundColor:'lightGray',
                  padding:'2rem'
                }}>
                  tooltip on hover: position
                  right
                </div>
            </SLDSPopoverTooltip>
          </div>
        </div>
        <div className="slds-col">
          <div style={{margin:'1rem'}}>
            <SLDSPopoverTooltip
              align="bottom"
              content={<span>Tooltip on bottom</span>}>
                <div style={{
                  backgroundColor:'lightGray',
                  padding:'2rem'
                }}>
                  tooltip on hover: position
                  bottom
                </div>
              </SLDSPopoverTooltip>
          </div>
        </div>
        <div className="slds-col">
          <div style={{margin:'1rem'}}>
            <SLDSPopoverTooltip
              align="top"
              content={<span>Tooltip on top</span>}>
                <div style={{
                  backgroundColor:'lightGray',
                  padding:'2rem'
                }}>
                  tooltip on hover: position
                  top
                </div>
              </SLDSPopoverTooltip>
          </div>
        </div>
      </div>

      <div className="slds-grid">
        <div className="slds-col">
          <div style={{margin:'1rem'}}>
            <SLDSPopoverTooltip
              align="bottom left"
              content={<span>Tooltip on bottom left</span>}>
                <div style={{
                  backgroundColor:'lightGray',
                  padding:'2rem'
                }}>
                  tooltip on hover: position
                  bottom left
                </div>
              </SLDSPopoverTooltip>
          </div>
        </div>        

        <div className="slds-col">
          <div style={{margin:'1rem'}}>
            <SLDSPopoverTooltip
              align="bottom right"
              content={<span>Tooltip on bottom right</span>}>
                <div style={{
                  backgroundColor:'lightGray',
                  padding:'2rem'
                }}>
                  tooltip on hover: position
                  bottom right
                </div>
              </SLDSPopoverTooltip>
          </div>
        </div>

        <div className="slds-col">
          <div style={{margin:'1rem'}}>
            <SLDSPopoverTooltip
              align="top left"
              content={<span>Tooltip on top left</span>}>
                <div style={{
                  backgroundColor:'lightGray',
                  padding:'2rem'
                }}>
                  tooltip on hover: position
                  top left
                </div>
              </SLDSPopoverTooltip>
          </div>
        </div>        

        <div className="slds-col">
          <div style={{margin:'1rem'}}>
            <SLDSPopoverTooltip
              align="top right"
              content={<span>Tooltip on top right</span>}>
                <div style={{
                  backgroundColor:'lightGray',
                  padding:'2rem'
                }}>
                  tooltip on hover: position
                  top right
                </div>
              </SLDSPopoverTooltip>
          </div>
        </div>


      </div>



      <div className="slds-grid">
        <div className="slds-col">
          <div style={{margin:'1rem'}}>
            <SLDSPopoverTooltip
              align="left bottom"
              content={<span>Tooltip on bottom left</span>}>
                <div style={{
                  backgroundColor:'lightGray',
                  padding:'2rem'
                }}>
                  tooltip on hover: position
                  left bottom
                </div>
              </SLDSPopoverTooltip>
          </div>
        </div>        

        <div className="slds-col">
          <div style={{margin:'1rem'}}>
            <SLDSPopoverTooltip
              align="right bottom"
              content={<span>Tooltip on bottom right</span>}>
                <div style={{
                  backgroundColor:'lightGray',
                  padding:'2rem'
                }}>
                  tooltip on hover: position
                  right bottom
                </div>
              </SLDSPopoverTooltip>
          </div>
        </div>

        <div className="slds-col">
          <div style={{margin:'1rem'}}>
            <SLDSPopoverTooltip
              align="left top"
              content={<span>Tooltip on top left</span>}>
                <div style={{
                  backgroundColor:'lightGray',
                  padding:'2rem'
                }}>
                  tooltip on hover: position
                  left top
                </div>
              </SLDSPopoverTooltip>
          </div>
        </div>        

        <div className="slds-col">
          <div style={{margin:'1rem'}}>
            <SLDSPopoverTooltip
              align="right top"
              content={<span>Tooltip on top right</span>}>
                <div style={{
                  backgroundColor:'lightGray',
                  padding:'2rem'
                }}>
                  tooltip on hover: position
                  right top
                </div>
              </SLDSPopoverTooltip>
          </div>
        </div>


      </div>
      </div>


      </div>
    );
  }

}

React.render(<TooltipExample />, mountNode);

