import React, {PropTypes} from 'react';
import Button from '../button';
import Icon from '../icon';
import cx from 'classnames';

const displayName = 'DockedComposer';

const propTypes = {
        bodyClasses: PropTypes.string,
        /**
        * If true, the expand button will appear allowing user to open the docked composer in a modal.
        **/
        canPopout: PropTypes.bool,
        children: React.PropTypes.element,
        footerRenderer: PropTypes.func,
        headerIconAssistiveText: PropTypes.string,
        headerIconCategory: PropTypes.string,
        headerIconName: PropTypes.string,
        headerRenderer: PropTypes.func,
        /**
        * If true, the docked composer will initially render open. If false, it will initially render minimized in dock.
        **/
        isOpen: PropTypes.bool,
        onClose: PropTypes.func,
        onMinimize: PropTypes.func,
        onPrimaryActionClick: PropTypes.func,
        primaryActionIsDisabled: PropTypes.bool,
        primaryActionLabel: PropTypes.string,
        title: PropTypes.string
};

const defaultProps = {
     bodyClasses: 'slds-col slds-grid slds-grid--vertical slds-nowrap slds-size--1-of-1'
};

class DockedComposer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDockedOpen: this.props.isOpen,
            dialogOpenClass: 'slds-is-open',
            composerModalOpen: false
        };
    }

    renderHeader() {
        if (this.props.headerRenderer) {
            return this.props.headerRenderer;
        }

        let expandButton;
        if (this.props.canPopout) {
            expandButton = (
                <Button
                    assistiveText = 'Expand Composer'
                    iconName = 'expand_alt'
                    iconVariant = 'bare'
                    variant = 'icon-inverse'
                    onClick = {this.toggleModal}
                    iconCategory = 'utility'
                />
            );
        }

        return (
            <header className="slds-docked-composer__header slds-grid slds-grid--align-spread slds-shrink-none">
                <div className="slds-media slds-media--center">
                    <div className="slds-media__figure">
                        <Icon
                            assistiveText = {this.props.headerIconAssistiveText}
                            category = {this.props.headerIconCategory}
                            name = {this.props.headerIconName}
                            size = "small"
                        />

                    </div>

                    <div className="slds-media__body">
                      <h2 id="dialog-heading-id">{this.props.title}</h2>
                    </div>
                </div>

                <div className="slds-docked-composer__actions">
                    <Button
                        assistiveText = 'Minimize window'
                        iconName = 'minimize_window'
                        iconVariant = 'bare'
                        variant = 'icon-inverse'
                        onClick = {this.toggleMinimize}
                        iconCategory = 'utility'
                    />
                    {expandButton}
                    <Button
                        assistiveText = 'Close'
                        iconName = 'close'
                        iconVariant = 'bare'
                        variant = 'icon-inverse'
                        onClick = {this.props.onClose}
                        iconCategory = 'utility'
                    />
                </div>
            </header>
        );
    }

    renderFooter() {

        if (this.props.footerRenderer) {
            return this.props.footerRenderer;
        }

        return (
            <footer className="slds-docked-composer__footer slds-shrink-none">
                <div className="slds-float--right slds-grid slds-grid--align-end slds-size--1-of-2 slds-text-align--right">
                    <Button
                        label = {this.props.primaryActionLabel}
                        variant="brand"
                        onClick={this.props.onPrimaryActionClick}
                        disabled = {this.props.primaryActionIsDisabled}
                    />

                </div>
            </footer>
        );
    }

    openComposer() {
        this.setState({isDockedOpen: true});
        this.setState({dialogOpenClass: 'slds-is-open'});
    }

    minimizeComposer() {
        this.setState({isDockedOpen: false});
        this.setState({dialogOpenClass: ''});
    }

    // open if minimized and vice versa
    toggleMinimize() {
        if (this.state.isDockedOpen || this.state.composerModalOpen) {
            if (this.props.onMinimize) {
                this.props.onMinimize();
            } else {
                this.minimizeComposer();
                this.dockComposer();
            }
        } else {
            this.openComposer();
        }
    }

    popoutComposer() {
        this.setState({composerModalOpen: true});
    }

    dockComposer() {
        this.setState({composerModalOpen: false});
    }

    // toggle popout between dockout and modal
    toggleModal() {
        if (this.state.composerModalOpen) {
            this.dockComposer();
            this.openComposer();
        } else {
            this.popoutComposer();
        }
    }

    render() {
        const header = this.renderHeader();

        const body = (
            <div className = {cx('slds-docked-composer__body', this.props.bodyClasses)}>
                {this.props.children}
            </div>
        );

        const footer = this.renderFooter();

        if (!this.state.composerModalOpen) { // create modal
            return (
                <div className = 'slds-docked_container'>
                    <div
                        role="dialog"
                        aria-labelledby="dialog-heading-id"
                        className = {cx('slds-docked-composer slds-grid slds-grid--vertical slds-nowrap', this.state.dialogOpenClass)}
                        >
                        {header}
                        {body}
                        {footer}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                <div aria-hidden="false" role="dialog" className="slds-modal slds-fade-in-open slds-docked-composer-modal">
                    <div className="slds-modal__container">
                        <div className="slds-modal__content">
                            <div className="slds-docked-composer slds-grid slds-grid--vertical slds-nowrap">

                            {header}
                            {body}
                            {footer}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="slds-backdrop slds-backdrop--open"></div>
                </div>
            );
        }
    }
}

DockedComposer.displayName = displayName;
DockedComposer.propTypes = propTypes;
DockedComposer.defaultProps = defaultProps;

module.exports = DockedComposer;


// export default React.createClass({
//     propTypes: {
//         bodyClasses: PropTypes.string,
//         /**
//         * If true, the expand button will appear allowing user to open the docked composer in a modal.
//         **/
//         canPopout: PropTypes.bool,
//         children: React.PropTypes.element,
//         footerRenderer: PropTypes.func,
//         headerIconAssistiveText: PropTypes.string,
//         headerIconCategory: PropTypes.string,
//         headerIconName: PropTypes.string,
//         headerRenderer: PropTypes.func,
//         /**
//         * If true, the docked composer will initially render open. If false, it will initially render minimized in dock.
//         **/
//         isOpen: PropTypes.bool,
//         onClose: PropTypes.func,
//         onMinimize: PropTypes.func,
//         onPrimaryActionClick: PropTypes.func,
//         primaryActionIsDisabled: PropTypes.bool,
//         primaryActionLabel: PropTypes.string,
//         title: PropTypes.string,
//     },

//     getInitialState() {
//         return {
//             isDockedOpen: this.props.isOpen,
//             dialogOpenClass: 'slds-is-open',
//             composerModalOpen: false
//         }

//     },

//     getDefaultProps() {
//         return {
//             bodyClasses: 'slds-col slds-grid slds-grid--vertical slds-nowrap slds-size--1-of-1',
//         };
//     },

//     renderHeader() {

//         if (this.props.headerRenderer) {
//             return this.props.headerRenderer;
//         }

//         let expandButton;
//         if (this.props.canPopout) {
//             expandButton = (
//                 <Button
//                     assistiveText = 'Expand Composer'
//                     iconName = 'expand_alt'
//                     iconVariant = 'bare'
//                     variant = 'icon-inverse'
//                     onClick = {this.toggleModal}
//                     iconCategory = 'utility'
//                 />
//             );
//         }

//         return (
//             <header className="slds-docked-composer__header slds-grid slds-grid--align-spread slds-shrink-none">
//                 <div className="slds-media slds-media--center">
//                     <div className="slds-media__figure">
//                         <Icon
//                             assistiveText = {this.props.headerIconAssistiveText}
//                             category = {this.props.headerIconCategory}
//                             name = {this.props.headerIconName}
//                             size = "small"
//                         />

//                     </div>

//                     <div className="slds-media__body">
//                       <h2 id="dialog-heading-id">{this.props.title}</h2>
//                     </div>
//                 </div>

//                 <div className="slds-docked-composer__actions">
//                     <Button
//                         assistiveText = 'Minimize window'
//                         iconName = 'minimize_window'
//                         iconVariant = 'bare'
//                         variant = 'icon-inverse'
//                         onClick = {this.toggleMinimize}
//                         iconCategory = 'utility'
//                     />
//                     {expandButton}
//                     <Button
//                         assistiveText = 'Close'
//                         iconName = 'close'
//                         iconVariant = 'bare'
//                         variant = 'icon-inverse'
//                         onClick = {this.props.onClose}
//                         iconCategory = 'utility'
//                     />
//                 </div>
//             </header>
//         );
//     },

//     renderFooter() {

//         if (this.props.footerRenderer) {
//             return this.props.footerRenderer;
//         }

//         return (
//             <footer className="slds-docked-composer__footer slds-shrink-none">
//                 <div className="slds-float--right slds-grid slds-grid--align-end slds-size--1-of-2 slds-text-align--right">
//                     <Button
//                         label = {this.props.primaryActionLabel}
//                         variant="brand"
//                         onClick={this.props.onPrimaryActionClick}
//                         disabled = {this.props.primaryActionIsDisabled}
//                     />

//                 </div>
//             </footer>
//         );

//     },

//     openComposer() {
//         this.setState({isDockedOpen: true});
//         this.setState({dialogOpenClass: 'slds-is-open'});
//     },

//     minimizeComposer() {
//         this.setState({isDockedOpen: false});
//         this.setState({dialogOpenClass: ''});
//     },

//     // open if minimized and vice versa
//     toggleMinimize() {
//         if (this.state.isDockedOpen || this.state.composerModalOpen) {
//             if (this.props.onMinimize) {
//                 this.props.onMinimize();
//             } else {
//                 this.minimizeComposer();
//                 this.dockComposer();
//             }
//         } else {
//             this.openComposer();
//         }
//     },

//     popoutComposer() {
//         this.setState({composerModalOpen: true});
//     },

//     dockComposer() {
//         this.setState({composerModalOpen: false});
//     },

//     // toggle popout between dockout and modal
//     toggleModal() {
//         if (this.state.composerModalOpen) {
//             this.dockComposer();
//             this.openComposer();
//         } else {
//             this.popoutComposer();
//         }
//     },

//     render() {
//         const header = this.renderHeader();

//         const body = (
//             <div className = {cx('slds-docked-composer__body', this.props.bodyClasses)}>
//                 {this.props.children}
//             </div>
//         );

//         const footer = this.renderFooter();

//         if (!this.state.composerModalOpen) { // create modal
//             return (
//                 <div className = 'slds-docked_container'>
//                     <div
//                         role="dialog"
//                         aria-labelledby="dialog-heading-id"
//                         className = {cx('slds-docked-composer slds-grid slds-grid--vertical slds-nowrap', this.state.dialogOpenClass)}
//                         >
//                         {header}
//                         {body}
//                         {footer}
//                     </div>
//                 </div>
//             );
//         } else {
//             return (
//                 <div>
//                 <div aria-hidden="false" role="dialog" className="slds-modal slds-fade-in-open slds-docked-composer-modal">
//                     <div className="slds-modal__container">
//                         <div className="slds-modal__content">
//                             <div className="slds-docked-composer slds-grid slds-grid--vertical slds-nowrap">

//                             {header}
//                             {body}
//                             {footer}

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="slds-backdrop slds-backdrop--open"></div>
//                 </div>
//             );
//         }
//     },


// });
