/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # SLDS for React Source Files

// Implements several components from the the [Salesforce Lightning Design System](https://www.lightningdesignsystem.com) in React.

// > See [live examples](/react/) of the SLDS for React in action.

// ## Badges
// * [Documentation](./badge/badge.html)
// * [Live Example](/react/badge)
// * [<img src="/assets/images/component-examples/badge.png" style="max-height: 200px;" alt="Badge Screenshot">](/react/badge)
export Badge from './badge';
// _______________________________________________________________________________________________________

// ## Buttons
// * [Documentation](./button.html)
// * [Live Example](/react/button)
// * [<img src="/assets/images/component-examples/button.png" style="max-height: 200px;" alt="Button Screenshot">](/react/button)
export Button from './button';
// _______________________________________________________________________________________________________

// ## Button Views
// * [Documentation](./button/view.html)
export ButtonView from './button/view';
// _______________________________________________________________________________________________________

// ## Button Groups
// * [Documentation](./button-group/button-group.html)
// * [Live Example](/react/button-group)
// * [<img src="/assets/images/component-examples/button-group.png" style="max-height: 200px;" alt="ButtonGroup Screenshot">](/react/button-group)
export ButtonGroup from './button-group';
// _______________________________________________________________________________________________________

// ## Checkbox
// * [Documentation](./checkbox/checkbox.html)
// * [Live Example](/react/checkbox)
// * [<img src="/assets/images/component-examples/checkbox.png" style="max-height: 200px;" alt="Checkbox Screenshot">](/react/checkbox)
export Checkbox from './checkbox';
// _______________________________________________________________________________________________________

// ## Data Tables
// * [Documentation](./data-table/data-table.html)
// * [Live Example](/react/data-table)
// * [<img src="/assets/images/component-examples/data-table.png" style="max-height: 200px;" alt="DataTable Screenshot">](/react/data-table)
export DataTable from './data-table';
export DataTableColumn from './data-table/column';
// _______________________________________________________________________________________________________

// ## Datepickers
// * [Documentation](./datepicker/datepicker.html)
// * [Live Example](/react/datepicker)
// * [<img src="/assets/images/component-examples/datepicker.png" style="max-height: 200px;" alt="Datepicker Screenshot">](/react/datepicker)
export Datepicker from './datepicker';
// _______________________________________________________________________________________________________

// ## Dropdowns
// * [Documentation](./dropdown/dropdown.html)
// * [Live Example](/react/dropdown)
// * [<img src="/assets/images/component-examples/dropdown.png" style="max-height: 200px;" alt="Dropdown Screenshot">](/react/dropdown)
export Dropdown from './dropdown';
export DropdownButtonTrigger from './dropdown/button-trigger';
// _______________________________________________________________________________________________________

// ## Icons
// * [Documentation](./icon/icon.html)
// * [Live Example](/react/icon)
// * [<img src="/assets/images/component-examples/icon.png" style="max-height: 200px;" alt="Icon Screenshot">](/react/icon)
export Icon from './icon';
// _______________________________________________________________________________________________________

// ## Inputs
// * [Documentation](./input/input.html)
// * [Live Example](/react/input)
// * [<img src="/assets/images/component-examples/input.png" style="max-height: 200px;" alt="Input Screenshot">](/react/input)
export Input from './input';
// _______________________________________________________________________________________________________

// ## Lookups
// * [Documentation](./lookup/lookup.html)
// * [Live Example](/react/lookup)
// * [<img src="/assets/images/component-examples/lookup.png" style="max-height: 200px;" alt="Lookup Screenshot">](/react/lookup)
export Lookup from './lookup';
// _______________________________________________________________________________________________________

// ## Menu
// * Supports menu-based components, including Dropdown and Picklist
export Menu from './menu';
export MenuItems from './menu/items';
export MenuItem from './menu/item';
// _______________________________________________________________________________________________________

// ## Modals
// * [Documentation](./modal/modal.html)
// * [Live Example](/react/modal)
// * [<img src="/assets/images/component-examples/modal.png" style="max-height: 200px;" alt="Modal Screenshot">](/react/modal)
export Modal from './modal';
// _______________________________________________________________________________________________________

// ## Notifications
// * [Documentation](./notification/notification.html)
// * [Live Example](/react/notification)
// * [<img src="/assets/images/component-examples/notification.png" style="max-height: 200px;" alt="Notification Screenshot">](/react/notification)
export Notification from './notification';
// _______________________________________________________________________________________________________

// ## Picklists
// * [Documentation](./picklist.html)
// * [Live Example](/react/picklist)
// * [<img src="/assets/images/component-examples/picklist.png" style="max-height: 200px;" alt="Picklist Screenshot">](/react/picklist)
export Picklist from './picklist';
// _______________________________________________________________________________________________________

// ## Pillss
// * [Documentation](./pills/pills.html)
// * [Live Example](/react/pills)
// * [<img src="/assets/images/component-examples/pills.png" style="max-height: 200px;" alt="Pills Screenshot">](/react/pills)
export Pills from './pills';
// _______________________________________________________________________________________________________

// ## Popovers
// * [Documentation](./popover/popover.html)
// * [Live Example](/react/popover)
// * [<img src="/assets/images/component-examples/popover.png" style="max-height: 200px;" alt="Popover Screenshot">](/react/popover)
export Popover from './popover';
// _______________________________________________________________________________________________________

// ## Radio
// * [Documentation](./radio/radio.html)
// * [Live Example](/react/radio)
// * [<img src="/assets/images/component-examples/radio.png" style="max-height: 200px;" alt="Radio Screenshot">](/react/radio)
export Radio from './radio';
// _______________________________________________________________________________________________________

// ## Spinners
// * [Documentation](./spinner/spinner.html)
// * [Live Example](/react/spinner)
// * [<img src="/assets/images/component-examples/spinner.png" style="max-height: 200px;" alt="Spinner Screenshot">](/react/spinner)
export Spinner from './spinner';
// _______________________________________________________________________________________________________

// ## Svgs (Deprecated)
// * [Documentation](./svg.html)
// * [Live Example](/react/svg)
// * [<img src="/assets/images/component-examples/svg.png" style="max-height: 200px;" alt="Svg Screenshot">](/react/svg)
export Svg from './svg';
// _______________________________________________________________________________________________________

// ## Tooltips
// * [Documentation](./tooltip/tooltip.html)
// * [Live Example](/react/tooltip)
// * [<img src="/assets/images/component-examples/tooltip.png" style="max-height: 200px;" alt="Tooltip Screenshot">](/react/tooltip)
export Tooltip from './tooltip';
// _______________________________________________________________________________________________________

// ## Trees
// * [Documentation](./tree/tree.html)
// * [Live Example](/react/tree)
// * [<img src="/assets/images/component-examples/tree.png" style="max-height: 200px;" alt="Tree Screenshot">](/react/tree)
export Tree from './tree';
