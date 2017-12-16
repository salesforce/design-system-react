import React, { PropTypes } from 'react';
import cx from 'classnames';

export default React.createClass({
    propTypes: {
        objectEntity: PropTypes.object,
        onClick: PropTypes.func
    },

    render() {
        return(
            <li
                role="presentation"
                className="slds-listbox__item"
                onClick={this.props.onClick}
                >
                    <div
                        id="listbox-option-id-1"
                        className={cx(
                            'slds-media',
                            'slds-listbox__option',
                            'slds-listbox__option_entity',
                            'slds-listbox__option_has-meta'
                        )}
                        role="option">
                      <span className="slds-media__body">
                        <span className={cx(
                            'slds-listbox__option-text',
                            'slds-listbox__option-text_entity'
                            )}>
                            {this.props.objectEntity.name}
                        </span>
                      </span>
                    </div>
            </li>
            );
    }
});
