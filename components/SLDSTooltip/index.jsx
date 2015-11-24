/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


import React from 'react';
import SLDSPopover from '../SLDSPopover';
const classNames = require("classnames");

const displayName = "SLDSTooltip";
const propTypes = {
  align: React.PropTypes.string,
  children: React.PropTypes.node,
  content: React.PropTypes.node,
  hoverCloseDelay: React.PropTypes.number,
  openByDefault: React.PropTypes.bool,
  openOn: React.PropTypes.string,
};
const defaultProps = {
  align: 'top',
  content: <span>Tooltip</span>,
  hoverCloseDelay: 350,
  openByDefault: false,
  openOn: 'hover',
};

class SLDSTooltip extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isClosing: false,
      isOpen: this.props.openByDefault,
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  handleMouseClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      isClosing: !this.state.isOpen
    });
  }


  handleMouseEnter() {
    this.setState({
      isOpen: true,
      isClosing: false
    });
  }

  handleMouseLeave() {
    this.setState({ isClosing: true });

    setTimeout(()=>{
      if(this.state.isMounted && this.state.isClosing){
        this.setState({
          isOpen: false,
          isClosing: false
        });
      }
    },this.props.hoverCloseDelay)
  }

  getTooltipContent() {
    return <div className='slds-popover__body'>{this.props.content}</div>;
  }

  getHorizontalAlign() {
    if (this.props.align==='left') {
      return 'left';
    }
    else if (this.props.align==='right') {
      return 'right';
    }
    return 'center';
  }

  getVerticalAlign() {
    if (this.props.align==='bottom') {
      return 'bottom';
    }
    else if (this.props.align==='top') {
      return 'top';
    }
    return 'middle';
  }

  handleCancel() {
    this.setState({
      isOpen: false,
      isClosing: false
    });
  }

  getClassName() {
    return classNames(this.props.className, "slds-popover", {
      ["slds-popover--tooltip"]: true,
      ["slds-nubbin--top"]: this.props.align === 'bottom',
      ['slds-nubbin--bottom']: this.props.align === 'top',
      ['slds-nubbin--left']: this.props.align === 'right',
      ['slds-nubbin--right']: this.props.align === 'left'
    });
  }

  getTooltip() {
    return this.state.isOpen?<SLDSPopover
          key={this.getHorizontalAlign()+' '+this.getVerticalAlign()}
          targetElement={this.refs.tooltipTarget}
          closeOnTabKey={true}
          className=''
          marginTop='1rem'
          marginBottom='1rem'
          marginLeft='1.5rem'
          marginRight='1.5rem'
          horizontalAlign={this.getHorizontalAlign()}
          verticalAlign={this.getVerticalAlign()}
          flippable={false}
          onClose={this.handleCancel.bind(this)}>
          <div className={this.getClassName()} role="tooltip">
            {this.getTooltipContent()}
          </div>
        </SLDSPopover>:null;
  }

  render(){
    return (
      <span refs='tooltipTarget' onClick={this.props.openOn === 'click' ? this.handleMouseClick.bind(this):null} onMouseEnter={this.props.openOn === 'hover' ? this.handleMouseEnter.bind(this):null} onMouseLeave={this.props.openOn === 'hover' ? this.handleMouseLeave.bind(this):null}>
        { this.props.children }
        { this.getTooltip() }
      </span>
    );
  }

}


SLDSTooltip.displayName = displayName;
SLDSTooltip.propTypes = propTypes;
SLDSTooltip.defaultProps = defaultProps;

module.exports = SLDSTooltip;

