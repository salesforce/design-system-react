import React, { Component } from 'react';

const displayName = 'SLDSBreadCrumb';
const propTypes = {
  /**
   * The assistive text for the breadcrumb trail
   */
  assistiveText: React.PropTypes.string,
  /**
   * An array of react elements presumably anchor elements.
   */
  trail: React.PropTypes.array,
};
const defaultProps = {};

class SLDSBreadCrumb extends Component {
  render() {
    const {
      assistiveText,
      trail,
    } = this.props;
    let trailElement;

    const renderTrail = () => {
      const breadCrumbTrail = trail.map((crumb, i) => {
        const crumbId = `SLDSBreadCrumb.${i}`;

        return (
          <li
            key={crumbId}
            className="slds-list__item slds-text-heading--label"
          >{crumb}</li>
        );
      });

      return (
        <ol className="slds-breadcrumb slds-list--horizontal" aria-labelledby="bread-crumb-label">
          {breadCrumbTrail}
        </ol>
      );
    };

    trailElement = renderTrail();

    return (
      <nav role="navigation">
        <p id="bread-crumb-label" className="slds-assistive-text">{assistiveText}</p>
        {trailElement}
      </nav>
    );
  }
}

SLDSBreadCrumb.displayName = displayName;
SLDSBreadCrumb.propTypes = propTypes;
SLDSBreadCrumb.defaultProps = defaultProps;

module.exports = SLDSBreadCrumb;
