/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { Component } from 'react';
import classnames from 'classnames';

const displayName = 'SLDSPageHeaderTitle';
const propTypes = {
  /**
   * Sets whether the title will truncate its content responsively.
   */
  truncate: React.PropTypes.bool,
  /**
   * Sets the vertical alignment on the title
   */
  align: React.PropTypes.oneOf(['top', 'middle', 'bottom']),
  /**
   * The title string (required)
   */
  title: React.PropTypes.string.isRequired,
  /**
   * Optional class name
   */
  className: React.PropTypes.string,
};
const defaultProps = {
  truncate: true,
  align: 'middle',
  title: 'Page Header Title',
  className: '',
};

class Title extends Component {
  render() {
    const { children, title, truncate, align, className, ...attr } = this.props;
    const classes = this._getClassNames(truncate, align, className);

    return (
      <p className={classes} title={title} {...attr}>
        {title}
        {children}
      </p>
    );
  }

  _getClassNames(truncate, align, className) {
    return classnames('slds-page-header__title', className, {
      'slds-truncate': truncate,
      [`slds-align-${align}`]: align,
    });
  }
}

Title.displayName = displayName;
Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

module.exports = Title;
