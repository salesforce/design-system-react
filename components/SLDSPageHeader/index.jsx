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
import omit from 'lodash.omit';
import Info from './Info';
import Title from './Title';
import DetailRow from './DetailRow';
import DetailBlock from './DetailBlock';
import Base from './Base';
import RecordHome from './RecordHome';
import ObjectHome from './ObjectHome';
import SLDSIcon from '../SLDSIcon';
import BreadCrumb from '../bread-crumb';

const displayName = 'SLDSPageHeader';
const propTypes = {
  /**
   * Optional class name
   */
  className: React.PropTypes.string,
  /**
   * The type of component
   */
  variant: React.PropTypes.string,
  /**
   * The info property can be a string or a React element
   */
  label: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
  /**
   * The title property can be a string or a React element
   */
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
  /**
   * The info property can be a string or a React element
   */
  info: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
  /**
   * The page header icon
   */
  icon: React.PropTypes.element,
  /**
   * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
   */
  iconName: React.PropTypes.string,
  /**
   * The icons category
   */
  iconCategory: React.PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
  /**
   * If omitted, icon position is centered.
   */
  iconPosition: React.PropTypes.oneOf(['left', 'right']),
  iconSize: React.PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
  /**
   * For icon variants, please reference <a href='http://www.lightningdesignsystem.com/components/buttons/#icon'>Lightning Design System Icons</a>.
   */
  iconVariant: React.PropTypes.oneOf(['bare', 'container', 'border', 'border-filled', 'small', 'more']),
  /**
   * Content to appear on the right hand side of the page header
   */
  contentRight: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
  /**
   * An array of buttons which appear on the component's right hand side.
   */
  details: React.PropTypes.array,
  /**
   * Nav content which appears in the upper right hand corner.
   */
  navRight: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
  /**
   * An array of react elements presumably anchor <a> elements.
   */
  trail: React.PropTypes.array,
};

const defaultProps = {
  className: '',
  variant: 'base',
  navRight: '',
  contentRight: '',
  details: [],
  trail: [],
};

/**
 * The SLDSPageHeader component adds SLDSPageHeader, SLDSPageHeader.Info, SLDSPageHeader.Title, SLDSPageHeader.DetailRow, and SLDSPageHeader.DetailBlock.
 */
class PageHeader extends Component {
  render() {
    const {
      className,
      icon,
      iconName,
      iconCategory,
      iconPosition,
      iconSize,
      iconVariant,
      label,
      title,
      info,
      variant,
      contentRight,
      navRight,
      details,
      trail,
    } = this.props;
    /**
     * OPTIMIZE ES7 style object destructuring removes the need for _.omit.
     *
     * Example:
     *
     *     const {foo, ...bar} = this.props;
     */
    const attr = omit([
      'className',
      'icon',
      'iconName',
      'iconCategory',
      'iconPosition',
      'iconSize',
      'iconVariant',
      'label',
      'title',
      'info',
      'variant',
      'contentRight',
      'navRight',
      'details',
      'trail',
    ], this.props);
    const classes = this._getClassNames(className);

    /**
     * Initialize component variables
     */
    let labelElement;
    let iconElement;
    let titleElement;
    let infoElement;
    let contentRightElement;
    let navRightElement;
    let Variant;

    /**
     * Render the icon
     */
    const renderIcon = () => {
      if (icon) {
        return icon;
      } else if (iconName) {
        return (
          <SLDSIcon
            name={iconName}
            category={iconCategory}
            position={iconPosition}
            size={iconSize}
            variant={iconVariant} />
        );
      }
    };

    /**
     * Render the label
     */
    const renderLabel = () => {
      const type = typeof label;

      if (trail.length > 0) {
        return (
          <nav className="slds-m-bottom--xx-small" role="navigation">
            <BreadCrumb trail={trail} />
          </nav>
        );
      } else {
        if (type === 'string') {
          return <p className="slds-text-heading--label">{label}</p>;
        } else {
          return label;
        }
      }
    };

    /**
     * Render the title
     */
    const renderTitle = () => {
      const type = typeof title;

      if (type === 'string') {
        return <Title title={title} />;
      } else {
        return title;
      }
    };

    /**
     * Render info
     */
    const renderInfo = () => {
      const type = typeof info;

      if (type === 'string') {
        return <Info>{info}</Info>;
      } else {
        return info;
      }
    };

    /**
     * Steal contentRight's children
     */
    const renderNavRight = () => {
      const type = typeof navRight;

      if (type !== 'string') {
        return (
          <div
            className="slds-col slds-no-flex slds-grid slds-align-top"
            {...navRight.props} />
        );
      } else {
        return navRight;
      }
    };

    /**
     * Steal contentRight's children
     */
    const renderContentRight = () => {
      const type = typeof contentRight;

      if (type !== 'string') {
        return (
          <div className="slds-grid" {...contentRight.props} />
        );
      } else {
        return contentRight;
      }
    };

    labelElement = renderLabel();
    iconElement = renderIcon();
    titleElement = renderTitle();
    infoElement = renderInfo();
    navRightElement = renderNavRight();
    contentRightElement = renderContentRight();

    switch (variant) {
    case 'objectHome':
      Variant = ObjectHome;
      break;
    case 'recordHome':
      Variant = RecordHome;
      break;
    case 'relatedList':
      Variant = RelatedList;
      break;
    default:
      Variant = Base;
    }

    return (
      <div className={classes} role="banner" {...attr}>
        <Variant
          label={labelElement}
          icon={iconElement}
          title={titleElement}
          info={infoElement}
          contentRight={contentRightElement}
          navRight={navRightElement}
          details={details} />
      </div>
    );
  }

  _getClassNames(className) {
    return classnames('slds-page-header', className);
  }
}

PageHeader.displayName = displayName;
PageHeader.propTypes = propTypes;
PageHeader.defaultProps = defaultProps;

module.exports = PageHeader;
module.exports.Info = Info;
module.exports.Title = Title;
module.exports.DetailRow = DetailRow;
module.exports.DetailBlock = DetailBlock;
