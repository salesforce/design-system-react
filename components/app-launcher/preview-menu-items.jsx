import IconUtility from '../slds-for-react/icon-utility.js';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import React from 'react';
import reactMixin from 'react-mixin';
import classNames from 'classnames';

class PreviewMenuItems extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	renderAppTiles (collection) {
		return collection.map((item, i) => {
			const iconWrapperPadding = item.categoryIcon.noPadding ? 'slds-p-around--none' : 'slds-p-around--x-small';
			const iconWrapperClasses = classNames('slds-icon__container slds-m-right--x-small', iconWrapperPadding);
			const iconClasses = item.categoryIcon.noPadding ? 'slds-icon' : 'slds-icon--x-small';

			return (
				<li className="slds-list__item" key={`slds-app-launcher__menu__item-${i}`}>
					<a
						className="slds-media slds-tile slds-p-horizontal--medium slds-p-vertical--x-small"
						href={item.applicationUrl}
					>
						<div className="slds-media__figure">
							<span
								className={iconWrapperClasses}
								style={{ background: item.categoryIcon.background }}
							>
								<IconUtility
									{...item.categoryIcon}
									className={iconClasses}
								/>
							</span>
						</div>
						<div className="slds-media__body">
							<p className="tile__title slds-truncate slds-text-body--regular">{item.appName}</p>
							<div className="slds-tile__detail slds-text-body--small">
								<p className="slds-truncate">{item.categoryName}</p>
							</div>
						</div>
					</a>
				</li>
			);
		});
	}

	render () {
		let collection = this.props.collection;

		return (
			<ul className={classNames("slds-list--vertical slds-has-selection slds-has-list-interactions", this.props.className)} >
				{this.renderAppTiles(collection)}
			</ul>
		);
	}
}

PreviewMenuItems.propTypes = {
	collection: React.PropTypes.array.isRequired,
	className: React.PropTypes.string
};

PreviewMenuItems.displayName = 'PreviewMenuItems';

reactMixin(PreviewMenuItems.prototype, PureRenderMixin);

export default PreviewMenuItems;
