import React from 'react';

import DataTable from '~/components/data-table'; // `~` is replaced with design-system-react at runtime
import DataTableColumn from '~/components/data-table/column';
import DataTableCell from '~/components/data-table/cell';
import IconSettings from '~/components/icon-settings';

const ROLES = [
    {
        id: "1",
        role: "Administrator",
        description: "Administrator",
        selected: false
    },
    {
        id: "4e8b466e-279f-e911-80f1-1402ec6b9528",
        role: "Analyst",
        description: "Analyst",
        selected: false
    },
    {
        id: "5fe58259-ad6d-e911-80ef-1402ec6b9529",
        role: "CDP Admin",
        description: "Has all permissions - for View ,Create and Delete",
        selected: false
    },
    {
        id: "4d8b466e-279f-e911-80f1-1402ec6b9528",
        role: "Data Manager",
        description: "Data Manager",
        selected: false
    }
];
const CustomDescriptionDataCell = ({ children, ...props }) => (
    <DataTableCell title={children} {...props}>
        <div style={{
            width: '100%',
            'whiteSpace': 'normal'
        }}>{children}</div>
    </DataTableCell>
);

CustomDescriptionDataCell.displayName = DataTableCell.displayName;

const CustomSelectDataCell = ({ item, onCheckboxClick }) => {
    const onChangeItem = () => {
        const data = { ...item, selected: !item.selected };
        onCheckboxClick(data);
    };

    return (
        <DataTableCell title={`${item.role}}`}>
            <IconSettings iconPath="/assets/icons">
                <div className="slds-grid_vertical slds-align_absolute-center slds-checkbox_add-button">
                    <input
                        type="checkbox"
                        onChange={onChangeItem}
                        className="slds-assistive-text"
                        id={item.id}
                        value={`add-checkbox-${item.id}}`}
                        tabIndex="-1"
                        checked={item.selected}
                    />
                    <label htmlFor={item.id} className="slds-checkbox_faux">
                        <span className="slds-assistive-text">{item.role}</span>
                    </label>
                </div>
            </IconSettings>
        </DataTableCell>
    );
};
CustomSelectDataCell.displayName = DataTableCell.displayName;

class Example extends React.Component {
    static displayName = 'DataTableExample';

    state = {
        items: ROLES
    };


    handleRoleClick = (data) => {
        const itemIndex = this.state.items.findIndex(item => item.id === data.id);
        this.setState({
            items: [
                ...this.state.items.slice(0, itemIndex),
                data,
                ...this.state.items.slice(itemIndex + 1)
            ]
        });
    }

    render() {
        return (
            <div>
                <IconSettings iconPath="/assets/icons">
                    <h3 className="slds-text-heading_medium slds-m-vertical_medium">
                        Custom Cell (User Quickflow)
					</h3>
                    <DataTable
                        fixedHeader
                        fixedLayout
                        items={this.state.items}
                        id="QuickFlowUserRoles"
                        noRowHover
                        className="slds-text-body_small"
                    >
                        <DataTableColumn label="" property="selected" width="4rem">
                            <CustomSelectDataCell onCheckboxClick={this.handleRoleClick} />
                        </DataTableColumn>
                        <DataTableColumn
                            label="Role"
                            property="role"
                            width="10rem"
                            primaryColumn
                        />
                        <DataTableColumn
                            label="Description"
                            property="description"
                        >
                            <CustomDescriptionDataCell />
                        </DataTableColumn>
                    </DataTable>
                </IconSettings>
            </div >
        );
    }
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
