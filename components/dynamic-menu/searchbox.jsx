import React, { PropTypes } from 'react';
import {
    SLDSIcon, SLDSButton
} from 'design-system-react';
import cx from 'classnames';

export default React.createClass({
    propTypes: {
        searchValue: PropTypes.string,
        onKeyUp: PropTypes.func,
        placeholder: PropTypes.string,
        selectedItem: PropTypes.object,
        onRemoveSelection: PropTypes.func
    },

    getSearchBox({hasListbox, inputValue, iconName, onClickIcon, onInputChange}) {
        return (
            <div className="slds-form-element">
                <div className="slds-form-element__control">
                    <div className={cx(
                        'slds-combobox_container',
                        hasListbox ? 'slds-has-inline-listbox' : ''
                        )}>
                        <div className={cx(
                            'slds-combobox',
                            'slds-dropdown-trigger',
                            'slds-dropdown-trigger_click'
                            )}
                            aria-expanded="false"
                            aria-haspopup="listbox"
                            role="combobox">
                            <div className={cx(
                                'slds-combobox__form-element',
                                'slds-input-has-icon'
                                )}
                                role="none">
                                <input
                                    type="text"
                                    className="slds-input slds-combobox__input"
                                    id="dynamic-menu-search-box"
                                    aria-autocomplete="list"
                                    aria-controls="listbox-unique-id"
                                    autoComplete="off"
                                    role="textbox"
                                    placeholder={this.props.placeholder}
                                    readOnly={hasListbox}
                                    value={inputValue}
                                    onChange={onInputChange}
                                />
                                <button className={cx(
                                    'slds-button',
                                    'slds-button_icon',
                                    'slds-input__icon',
                                    'slds-input__icon_right',
                                    'combobox-icon'
                                    )}
                                    onClick={onClickIcon}
                                    >
                                    <SLDSIcon
                                        category="utility"
                                        name={iconName}
                                        size="x-small"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
    },

    render() {
        if(this.props.selectedItem) {
            return this.getSearchBox({
                hasListbox: true,
                inputValue: this.props.selectedItem.name,
                iconName: 'close',
                onClickIcon: this.props.onRemoveSelection
            });
        }

        return this.getSearchBox({
            hasListbox: false,
            inputValue: this.props.searchValue,
            iconName: 'search',
            onInputChange: this.props.onKeyUp
        });
    }
});
