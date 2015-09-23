/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

const React = require('react');
const PT = React.PropTypes;
import createChainedFunction from '../utils/create-chained-function';
import classNames from 'classnames';
import {omit} from 'lodash';

class TabContent extends React.Component {

  render() {
    const className = classNames(
      this.props.className,
      'slds-tabs__content',
      {'slds-show': this.props.current, 'slds-hide': !this.props.current}
    );
    const props = omit('className', this.props);
    return (
      <div {...props} className={className} role="tabpanel">
        {this.props.children}
      </div>
    );
  };
}
TabContent.propTypes = { current: PT.bool };
TabContent.defaultProps = { current: true };

class TabItem extends React.Component {

  renderCustom(tabIndex) {
    return React.cloneElement(this.props.content, {onClick: this.props.onClick.bind(this), tabIndex: tabIndex, 'aria-selected': this.props.current});
  }

  renderDefault(tabIndex) {
    return (
      <a className={this.props.innerClass} onClick={this.props.onClick.bind(this)} href="#" role="tab" tabIndex={tabIndex} aria-selected={this.props.current}>
        {this.props.title}
      </a>
    );
  }

  render() {
    const props = omit(['className', 'role'], this.props);
    const className = classNames(this.props.className, 'slds-tabs__item slds-text-heading--label', {'slds-active': this.props.current});
    const role = this.props.current ? 'presentation' : this.props.role;
    const tabIndex = this.props.current ? 0 : -1;
    return (
      <li className={className} {...props} role={role}>
        {this.props.content ? this.renderCustom(tabIndex) : this.renderDefault(tabIndex) }
      </li>
    );
  };
}
TabItem.propTypes = { title: PT.string, content: PT.node }

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentTab: this.props.selectedIndex};
  };

  onClick(index, e) {
    this.setState({currentTab: index});
    e.preventDefault();
    e.stopPropagation();
  }

  tabs() {
    return React.Children.map(this.props.children, (c, i) => {
      return React.cloneElement(c, {current: this.state.currentTab === i, onClick: createChainedFunction(c.props.onClick, this.onClick.bind(this, i))});
    });
  }

  currentPanel() {
    return React.Children.map(this.props.children, (c, i) => {
      if(c.props.children.type === TabContent) {
        return React.cloneElement(c.props.children, {current: this.state.currentTab === i});
      } else {
        return <TabContent current={this.state.currentTab === i}>{c.props.children}</TabContent>;
      }
    });
  }

  render() {
    const props = omit(['className', 'flavor'], this.props);
    return (
      <div {...props} className={`slds-tabs--${this.props.flavor}`}>
        <ul className={`slds-tabs--${this.props.flavor}__nav`} role="tablist" selectedIndex={this.props.selectedIndex}>
          { this.tabs() }
        </ul>
        { this.props.panel ? this.props.panel : this.currentPanel() }
      </div>
    );
  }
}
Tabs.propTypes = {
  selectedIndex: PT.number,
  flavor: PT.oneOf(['scoped', 'default'])
};
Tabs.defaultProps = { selectedIndex: 0 };


Tabs.Item = TabItem;
Tabs.Content = TabContent;

module.exports = Tabs;
