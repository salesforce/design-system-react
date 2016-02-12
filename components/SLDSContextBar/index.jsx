/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from "react";
const classNames = require("classnames");
import omit from "lodash.omit";

const displayName = 'SLDSContextBar';
const propTypes = {
  // onClick: React.PropTypes.func,
};
const defaultProps = {
  // responsive: false,
};

const CSS_PREFIX = 'slds2-';
function pf(className) {
  return className.split(/\s+/).map(c => {
    return `${CSS_PREFIX}${c}`;
  }).join(' ');
}

const SASS_VARIABLES = {
  '$border-width-thin': '1px',
  '$color-background-context-bar': 'rgb(22, 50, 92)',
  '$color-background-context-bar-highlight': 'rgba(#fff, 0.2)',
  '$color-border-context-bar-divider': 'rgba(#fff, 0.2)',
  '$color-context-bar-alt': '#fff',
  '$color-context-bar-shadow': '#000',
  '$color-text-context-bar': 'rgb(255, 255, 255)',
  '$color-text-context-nav-trigger': 'rgba(#fff, 0.4)',
  '$height-context-bar': '2.25rem',
}

/**
 * The SLDSContextBar component is the Lightning Design System Context Bar component. The SLDSContextBar is a container with dropdown menus.
 */
class SLDSContextBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  componentDidMount() {
    super.componentDidMount()
  }

  componentWillUnmount() {
    super.componentWillUnmount()
  }

  // handleClick() {
  //   if(this.props.onClick) this.props.onClick();
  //   this.setState({ active: !this.state.active });
  // }

  getClassName() {
    return classNames(this.props.className, "slds2-context-bar", {
      // [`slds-button--${this.props.variant}`]: !base && !iconOnly,
      // [`slds-button--icon-${this.props.iconVariant}`]: this.props.iconVariant,
      // ["slds-max-small-button--stretch"]: this.props.responsive,
    });
  }

  getComponentStyles() {
    function replacer(match, p1) {
      return SASS_VARIABLES[p1] || p1;
    }

    const css = `
    .slds2-context-bar {
      height: $height-context-bar;
      background-color: $color-background-context-bar;
      color: $color-text-context-bar;
    }
    .slds2-context-bar__primary,
    .slds2-context-bar__secondary {
      flex: 0 0 auto;
    }

    .slds2-context-bar__shadow {
      position: absolute;
      top: 100%;
      right: 0;
      left: 0;
      height: rem(4px);
      background: linear-gradient(to bottom, rgba($color-context-bar-shadow, 0.25) 0, rgba($color-context-bar-shadow, 0) 100%);
    }

    .slds2-context-bar__vertical-divider {
      width: 0;
      overflow: hidden;
      border-left: $border-width-thin solid $color-border-context-bar-divider;
    }
    `.replace(/(\$[a-zA-Z0-9\-]+)/g, replacer);
    return css;
  }

  render() {
    const props = omit(this.props, ["className", "label", "onClick"]);

                // <button aria-haspopup="true" className={pf('context-bar-action__trigger button button--icon-bare')}>
                //   <SvgIcon className={pf('button__icon button__icon--small context-bar-action__trigger-icon')} sprite="utility" symbol="down" />
                //   <span className={pf('assistive-text')}>Assistive text for submenu</span>
                // </button>
                // <Menu className={pf('nubbin--top')}>
                //   <Menu.List isSelectable={false}>
                //     <Menu.Item>
                //       <SvgIcon className={pf('icon icon--x-small icon-text-default m-right--x-small')} sprite="utility" symbol="add" />
                //       Main action
                //     </Menu.Item>
                //   </Menu.List>
                //   <hr className={pf('m-vertical--xx-small')} role="presentation" />
                //   <div className={pf('dropdown__header')}>
                //     <span className={pf('text-heading--label')}>Menu header</span>
                //   </div>
                //   <Menu.List isSelectable={false}>
                //     <Menu.Item>Menu Item One</Menu.Item>
                //     <Menu.Item>Menu Item Two</Menu.Item>
                //     <Menu.Item>Menu Item Three</Menu.Item>
                //   </Menu.List>
                // </Menu>

                // <button aria-haspopup="true" className={pf('context-bar-action__trigger button button--icon-bare')}>
                //   <SvgIcon className={pf('button__icon button__icon--small context-bar-action__trigger-icon')} sprite="utility" symbol="down" />
                //   <span className={pf('assistive-text')}>Assistive text for submenu</span>
                // </button>


    return (
      <div className={this.getClassName()} {...props}>
        <div className={pf('context-bar grid')}>
          <div className={pf('context-bar__shadow')}></div>
          <div className={pf('context-bar__primary context-bar-action grid grid--vertical-align-stretch')}>
            <a href="#void" className={pf('context-bar-action__label grid grid--vertical-align-center text-link--reset p-horizontal--large text-heading--small')}>
              Title
            </a>
          </div>
          <nav className={pf('context-bar__secondary grid')} role="navigation">
            <div className={pf('context-bar__vertical-divider')}></div>
            <ul className={pf('grid grid--vertical-stretch')}>
              <li className={pf('context-bar-action grid')}>
                <a href="#void" className={pf('context-bar-action__label text-link--reset grid grid--vertical-align-center')}>Home</a>
              </li>
              <li className={pf('context-bar-action grid dropdown-trigger')}>
                <a href="#void" className={pf('context-bar-action__label context-bar-action__label--expand text-link--reset grid grid--vertical-align-center')}>Menu Item 1</a>
              </li>
              <li className={pf('context-bar-action grid')}>
                <a href="#void" className={pf('context-bar-action__label context-bar-action__label--expand text-link--reset grid grid--vertical-align-center')}>Menu Item 2</a>
              </li>
            </ul>
          </nav>
          <style>{this.getComponentStyles()}</style>
        </div>
        {this.props.children}
      </div>
    )
  }
}

SLDSContextBar.displayName = displayName;
SLDSContextBar.propTypes = propTypes;
SLDSContextBar.defaultProps = defaultProps;

module.exports = SLDSContextBar;
