import React, { PropTypes } from 'react';
import Searchbox from './searchbox';
import Listbox from './listbox';

export default React.createClass({
    propTypes: {
        availableItems: PropTypes.array,
        searchValue: PropTypes.string,
        selectedItem: PropTypes.object,
        onSearchKeyUp: PropTypes.func,
        onSelectItem: PropTypes.func,
        onRemoveSelection: PropTypes.func,
        searchboxPlaceholder: PropTypes.string
    },

    render() {
        return (
            <div className="slds-form-element">
                <div className="slds-form-element__control">
                    <div className="slds-combobox_container">
                        <Searchbox
                            searchValue={this.props.searchValue}
                            selectedItem={this.props.selectedItem}
                            onKeyUp={this.props.onSearchKeyUp}
                            onRemoveSelection={this.props.onRemoveSelection}
                            placeholder={this.props.searchboxPlaceholder}
                        />
                        <Listbox
                            searchValue={this.props.searchValue}
                            allObjects={this.props.availableItems}
                            onSelectItem={this.props.onSelectItem}
                        />
                    </div>
                </div>
            </div>
            );
    }
});
