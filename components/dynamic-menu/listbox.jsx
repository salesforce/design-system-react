import React, { PropTypes } from 'react';
import cx from 'classnames';
import Listitem from './listitem';

export default React.createClass({
        propTypes: {
                allObjects: PropTypes.array,
                onSelectItem: PropTypes.func,
                searchValue: PropTypes.string
        },

        getDefaultProps() {
                return {
                        allObjects: []
                };
        },

        getListitems() {
                return this.props.allObjects.map((obj) => {
                        return (<Listitem
                                        objectEntity={obj}
                                        onClick={() => {this.props.onSelectItem(obj);}}
                                        key={obj.name}
                                />);
                });
        },

        getHeader() {
                if(this.props.allObjects.length == 0) {
                        let msg = app.i18n.t('context:details.searchNoMatches', { 0: this.props.searchValue });
                        return (<div>{msg}</div>);
                }

                return null;
        },

        render() {
                return (
                        <div id="listbox-unique-id" role="listbox">
                                <ul className={cx(
                                'slds-listbox',
                                'slds-listbox_vertical',
                                'slds-dropdown_length-10',
                                'modal-dynamic-menu-ul'
                                )}
                                role="group"
                                >
                                        <li role="presentation" className="slds-listbox__item">
                                                <div className={cx(
                                                        'slds-media',
                                                        'slds-listbox__option',
                                                        'slds-listbox__option_plain'
                                                        )}
                                                        role="presentation">
                                                        {this.getHeader()}
                                                </div>
                                        </li>
                                        {this.getListitems()}
                                </ul>
                        </div>
                );
        }
});
