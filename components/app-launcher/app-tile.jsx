import Icon from 'slds-for-react/icon';
import IconUtility from '../slds-for-react/icon-utility.js';
import Tooltip from '../slds-for-react/tooltip.js';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import React from 'react';
import reactMixin from 'react-mixin';
import classNames from 'classnames';


class AppTile extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			tooltip: {
				content: this.props.appDescription,
				trigger: 'click',
				positionedTargetVerticalAttachment: 'bottom-left',
				isOpen: false,
				modal: false,
				container: document.querySelector('body'),
				positionedOffset: 20
			}
		};

		this._moreRendered = this._moreRendered.bind(this);
		this._handleMoreClick = this._handleMoreClick.bind(this);
		this._getDescriptionClass = this._getDescriptionClass.bind(this);
		this._handleTileClick = this._handleTileClick.bind(this);
		this._pageClick = this._pageClick.bind(this);
		this._mouseDownHandler = this._mouseDownHandler.bind(this);
		this._mouseUpHandler = this._mouseUpHandler.bind(this);
	}

	_moreRendered (element) {
		const tooltipState = this.state.tooltip;
		tooltipState.alignmentTarget = element;
		this.setState(tooltipState);
	}

	_handleMoreClick (e) {
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();

		const tooltipState = this.state.tooltip;
		tooltipState.isOpen = !(tooltipState.isOpen);
		this.setState(tooltipState);
	}

	_handleTileClick (e) {
		if (typeof this.props.onClick !== 'function') {
			if (this.props.installed) {
				window.location = this.props.applicationUrl;
				e.preventDefault();
			} else {
				const win = window.open(this.props.productUrl, '_blank');
				win.focus();
			}
		} else {
			this.props.onClick(e);
		}

		this.props.appTileClicked(e, this.props.uninstalled);
	}

	// Don't apply multiline truncate class until modal is visible. Otherwise it will not work -cdmc
	_getDescriptionClass () {
		return this.props.isVisible ? 'slds-multiline-truncate' : '';
	}

	_renderLockIcon () {
		return (
			<span className="locked-icon slds-icon__container slds-m-around--none slds-p-around--none">
				<Icon category="utility" name="lock" className="slds-icon slds-icon--x-small" />
			</span>
		);
	}

	isEnabled () {
		return this.props.isProvisioned && this.props.hasAccess;
	}

	componentDidMount () {
		window.addEventListener('mousedown', this._pageClick, false);
	}

	_pageClick () {
		if (this.mouseIsDownThis) {
			return;
		}

		const tooltipState = this.state.tooltip;
		tooltipState.isOpen = false;
		this.setState(tooltipState);
	}

	_mouseDownHandler () {
		this.mouseIsDownThis = true;
	}

	_mouseUpHandler () {
		this.mouseIsDownThis = false;
	}

	_renderMore (description, tooltipState) {
		const displayMore = (description.length > 50);
		const more = (
			<button
				className="slds-icon_container slds-tile--board__icon slds-button"
				ref={this._moreRendered}
				onClick={this._handleMoreClick}
				onMouseDown={this._mouseDownHandler}
				onMouseUp={this._mouseUpHandler}
			>
				<span>{this.props.localization.APP_LAUNCHER_MORE}</span>
				<Tooltip {...tooltipState}>
					<span>{tooltipState.content}</span>
				</Tooltip>
			</button>
		);

		return displayMore ? more : '';
	}

	render () {
		const tooltipState = this.state.tooltip;
		const tileStyle = this.isEnabled() ? 'enabled' : 'non-enabled';
		const descriptionLearnMore = <span className="learn_more">{this.props.localization.APP_LAUNCHER_LEARN_MORE}</span>;
		const description = this.isEnabled() ? this.props.appDescription : descriptionLearnMore;
		const ribbon = this.isEnabled() ? '' : <div className="ribbon">{this.props.localization.APP_LAUNCHER_NOT_INSTALLED}</div>;
		const lockedIcon = this.isEnabled() ? '' : this._renderLockIcon();

		const iconWrapperPadding = this.props.categoryIcon.noPadding ? 'slds-p-around--none' : 'slds-p-around--small';
		const iconWrapperClasses = classNames('slds-icon__container slds-m-around--small', iconWrapperPadding);
		const iconClasses = this.props.categoryIcon.noPadding ? 'slds-icon slds-icon--x-large' : 'slds-icon';

		const more = this._renderMore(description, tooltipState);

		return (
			<li className="slds-size--1-of-3">
				<a
					href="#"
					onClick={this._handleTileClick}
					className={classNames('slds-list__item slds-m-around--x-small slds-p-around--none', tileStyle)}
				>
					<div className="slds-media slds-tile--board slds-tile slds-m-around--xxx-small">
						{ribbon}
						{lockedIcon}
						<div className="slds-media__figure slds-m-right--none">
							<span
								className={iconWrapperClasses}
								style={{ background: this.props.categoryIcon.background }}
							>
								<IconUtility
									{...this.props.categoryIcon}
									className={iconClasses}
								/>
							</span>
						</div>
						<div className="slds-media__body slds-m-vertical--x-small slds-m-horizontal--small">
							<p className="tile__title slds-truncate slds-text-body--regular">{this.props.appName}</p>
							<div className="slds-tile__detail slds-text-body--small slds-has-flexi-truncate">
								<p className={this._getDescriptionClass()}>
									<span className="slds-text-heading--label">{this.props.categoryName} </span>
									{description}
								</p>
								{more}
							</div>
						</div>
					</div>
				</a>
			</li>
		);
	}
}

AppTile.displayName = 'AppTile';

AppTile.propTypes = {
	localization: React.PropTypes.object.isRequired,
	appName: React.PropTypes.string.isRequired,
	appDescription: React.PropTypes.string.isRequired,
	appTileClicked: React.PropTypes.func,
	categoryName: React.PropTypes.string.isRequired,
	categoryIcon: React.PropTypes.object.isRequired,
	hasAccess: React.PropTypes.bool,
	isProvisioned: React.PropTypes.bool,
	isVisible: React.PropTypes.bool,
	onClick: React.PropTypes.func,
	applicationUrl: React.PropTypes.string,
	productUrl: React.PropTypes.string
};

reactMixin(AppTile.prototype, PureRenderMixin);

export default AppTile;
