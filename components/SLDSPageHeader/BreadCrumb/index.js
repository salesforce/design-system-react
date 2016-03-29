import React, { Component } from 'react';
import randomId from '../randomId';

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
    const id = `SLDSBreadCrumb.${randomId()}`;
    let trailElement;

    const renderTrail = () => {
      const breadCrumbTrail = trail.map((crumb, i) => {
        const crumbId = `${id}.${i}`;

        return (
          <li
            key={crumbId}
            className="slds-list__item slds-text-heading--label"
          >{crumb}</li>
        );
      });

      return (
        <ol className="slds-breadcrumb slds-list--horizontal" aria-labelledby={id}>
          {breadCrumbTrail}
        </ol>
      );
    };

    trailElement = renderTrail();

    return (
      <nav role="navigation">
        <p id={id} className="slds-assistive-text">{assistiveText}</p>
        {trailElement}
      </nav>
    );
  }
}

SLDSBreadCrumb.displayName = displayName;
SLDSBreadCrumb.propTypes = propTypes;
SLDSBreadCrumb.defaultProps = defaultProps;

export default SLDSBreadCrumb;
