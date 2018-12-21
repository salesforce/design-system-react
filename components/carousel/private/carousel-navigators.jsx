/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';


import { CAROUSEL_NAVIGATORS } from '../../../utilities/constants';

/**
 * carouselNavigator is used to display left and right navigators (arrows)
 */
const carouselNavigator = (props) => (
    <div className="slds-carousel__col-center">
        <button
            className="slds-button slds-button_icon slds-carousel__button slds-button_icon-border-filled slds-button_icon-x-small"
            disabled={props.isDisabled}
            onClick={props.onClick}
        >
            <svg
                className="slds-icon slds-icon-text-default"
                aria-hidden="true"
                style={{ width: '60%', height: '100%' }}
            >
                <use xlinkHref={`/assets/icons/utility-sprite/svg/symbols.svg#${props.orientation}`} />
            </svg>
        </button>
    </div>
)


carouselNavigator.displayName = CAROUSEL_NAVIGATORS;

// ### Prop Types
carouselNavigator.propTypes = {
	/**
	 * Determines where the navigator indicator has been disabled
	 */
    isDisabled: PropTypes.bool,
    /**
	 * Triggered when the indicator is clicked.
	 */
	onClick: PropTypes.func,
    /**
	 * String showing the navigator's orientation left/right.
	 */
	orientation: PropTypes.string
};

export default carouselNavigator;
