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

const getClassName = (props) => {
  return classNames(props.className, "slds-popover", {
    ["slds-popover--tooltip"]: true,
    ["slds-nubbin--top"]: props.align === 'bottom',
    ['slds-nubbin--bottom']: props.align === 'top',
    ['slds-nubbin--left']: props.align === 'right',
    ['slds-nubbin--right']: props.align === 'left'
  });
};

const getHorizontalAlign = (align) => {
  if (align==='left') {
    return 'left';
  }
  else if (align==='right') {
    return 'right';
  }
  return 'center';
};

const getVerticalAlign = (align) => {
  if (align==='bottom') {
    return 'bottom';
  }
  else if (align==='top') {
    return 'top';
  }
  return 'middle';
};

const getTooltip = (props, content, target, onClose) => {
  return <SLDSPopover
            className=''
            closeOnTabKey={true}
            flippable={false}
            horizontalAlign={getHorizontalAlign(props.align)}
            marginBottom='1.2rem'
            marginLeft='.75rem'
            marginRight='.75rem'
            marginTop='1.2rem'
            onClose={onClose}
            targetElement={target}
            verticalAlign={getVerticalAlign(props.align)}>
              <div className={getClassName(props)} role="tooltip">{content}</div>
          </SLDSPopover>;
}

module.exports = {

  getClassName: getClassName,

  getHorizontalAlign: getHorizontalAlign,

  getVerticalAlign: getVerticalAlign,

  getTooltip: getTooltip

};
