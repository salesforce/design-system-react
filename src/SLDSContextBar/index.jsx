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
import SLDSIcon from "../SLDSIcon";

import Title from "./Title";
import Nav from "./Nav";
import NavMenu from "./NavMenu";
import NavMenuLink from "./NavMenuLink";

import styling from "./styling";

const pf = styling.pf;

const displayName = 'SLDSContextBar';
const propTypes = {
  /**
   * The main title shown in the bar.
   */
  title: React.PropTypes.string
};
const defaultProps = {
  title: 'Title'
};
/*
const OLD_CSS_PREFIX = 'slds-';
const NEW_CSS_PREFIX = 'slds2-';
function pf(className) {
  return className.split(/\s+/).map(c => {
    // Add prefix only for "context" classes
    return c.indexOf('context') >= 0 ? `${NEW_CSS_PREFIX}${c}` : `${OLD_CSS_PREFIX}${c}`;
  }).join(' ');
}
*/
/**
 * The SLDSContextBar component is the Lightning Design System Context Bar component. The SLDSContextBar is a container with dropdown menus.
 */
class ContextBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  componentDidMount() {
    // TODO: componentDidMount
  }

  componentWillUnmount() {
    // TODO: componentWillUnmount
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

  renderLinkMenuItem(menuItem, menuItemIndex) {
    const { onSelect } = this.props;
    const { label } = menuItem;
    const key = `SLDSContextBar.menuItem.${menuItemIndex}.${label}`;

    function onClick(event) {
      if (onSelect) {
        if (event.stopPropagation) { event.stopPropagation(); }
        if (event.preventDefault) { event.preventDefault(); }
        onSelect(event, menuItem, menuItemIndex);
      }
    }

    return <li className={pf('context-bar-action grid')} key={key}>
      <a href="javascript:void(0)" className={pf('context-bar-action__label text-link--reset grid grid--vertical-align-center FIX-context-bar-a')} onClick={onClick.bind(this)}>
        {label}
      </a>
    </li>;
  }

  renderMenuItems() {
    return (this.props.menuItems || []).map((menuItem, menuItemIndex) => {
      switch (menuItem.type) {
        case 'link': return this.renderLinkMenuItem(menuItem, menuItemIndex);
      }
    });
  }

  render() {
    const props = omit(this.props, ["className", "label", "onClick"]);

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


    return (
      <div className={this.getClassName()} {...props}>
        <div className={pf('context-bar grid')}>
          <div className={pf('context-bar__shadow')}></div>
            { this.props.children }
{/*
          <div className={pf('context-bar__primary context-bar-action grid grid--vertical-align-stretch')}>
            <a href="#void" className={pf('context-bar-action__label grid grid--vertical-align-center text-link--reset p-horizontal--large text-heading--small FIX-context-bar-a')}>
              {this.props.title}
            </a>
          </div>
          <nav className={pf('context-bar__secondary grid')} role="navigation">
            <div className={pf('context-bar__vertical-divider')}></div>
            <ul className={pf('grid grid--vertical-stretch')}>
              {this.renderMenuItems()}
              <li className={pf('context-bar-action grid dropdown-trigger')}>
                <a href="#void" className={pf('context-bar-action__label context-bar-action__label--expand text-link--reset grid grid--vertical-align-center FIX-context-bar-a')}>Menu Item 1</a>
                <button aria-haspopup="true" className={pf('context-bar-action__trigger button button--icon-bare')}>
                  <SLDSIcon className={pf('context-bar-action__trigger-icon')} category="utility" name="down" size="x-small" assistiveText="Open submenu" />
                </button>
              </li>
              <li className={pf('context-bar-action grid')}>
                <a href="#void" className={pf('context-bar-action__label context-bar-action__label--expand text-link--reset grid grid--vertical-align-center FIX-context-bar-a')}>Menu Item 2</a>
                <button aria-haspopup="true" className={pf('context-bar-action__trigger button button--icon-bare')}>
                  <SLDSIcon className={pf('context-bar-action__trigger-icon')} category="utility" name="down" size="x-small" assistiveText="Open submenu" />
                </button>
              </li>
            </ul>
          </nav>
*/}
          <style>{styling.getComponentStyles()}</style>
        </div>
      </div>
    )
  }
}

ContextBar.displayName = displayName;
ContextBar.propTypes = propTypes;
ContextBar.defaultProps = defaultProps;
ContextBar.Title = Title;
ContextBar.Nav = Nav;
ContextBar.NavMenu = NavMenu;
ContextBar.NavMenuLink = NavMenuLink;
module.exports = ContextBar;
