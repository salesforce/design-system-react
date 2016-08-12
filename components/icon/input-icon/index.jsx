/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from 'react';
import SLDSUtilityIcon from '../../utilities/utility-icon';

const displayName = 'InputIcon';

const propTypes = {
  category: React.PropTypes.string,
  icon: React.PropTypes.object,
  name: React.PropTypes.string,
  onClick: React.PropTypes.func,
};
const defaultProps = {
  category: 'utility',
};

class InputIcon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const className = 'slds-input__icon slds-icon-text-default';
    return <SLDSUtilityIcon
              aria-hidden='true'
              category={this.props.category}
              className={className}
              icon={this.props.icon}
              name={this.props.name}
              onClick={this.props.onClick}
              style={this.props.style}
            />;
  }
}

InputIcon.displayName = displayName;
InputIcon.propTypes = propTypes;
InputIcon.defaultProps = defaultProps;

module.exports = InputIcon;
