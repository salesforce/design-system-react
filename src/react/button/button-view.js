/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// BUTTON VIEW - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import ButtonViewCore, {CONTROL} from '../../core/button-view';

// Framework specific
import React from 'react';
import Svg from '../svg/svg';
import State from '../mixins/state';
import isIcon from '../mixins/custom-prop-types/icon.js';

export const ButtonViewObject = {
	displayName: CONTROL,

	propTypes: {
		assistiveText: React.PropTypes.string,
		icon: isIcon,
		iconPosition: React.PropTypes.oneOf(Object.keys(ButtonViewCore.iconPositions)),
		iconSize: React.PropTypes.oneOf(Object.keys(ButtonViewCore.buttonIconSizes)),
		text: React.PropTypes.string,
		view: React.PropTypes.oneOf(Object.keys(ButtonViewCore.buttonStatefulViewStyles))
	},

	_renderAssistiveText () {
		if (this.props.assistiveText) {
			return <span className={this.cssClasses.ASSISTIVE_TEXT}>{this.props.assistiveText}</span>;
		}
	},

	_renderIcon (position) {
		let buttonIconSize = '';

		if (this.props.iconSize) {
			buttonIconSize = this.buttonIconSizes[this.props.iconSize];
		}

		if (this.props.icon && this.props.iconPosition === position) {
			return (<Svg className={this._getIconClassNames(buttonIconSize)} icon={this.props.icon} />);
		}

		if (position === 'right' && this.props.iconStyle === 'icon-more') {
			buttonIconSize = this.buttonIconSizes['x-small'];
			return (<Svg className={this._getIconClassNames(buttonIconSize)} icon={this.moreIcon} />);
		}
	},

	render () {
		return (
			<span className={this.buttonStatefulViewStyles[this.props.view]}>{this._renderIcon('left')}{this.props.text}{this._renderAssistiveText()}{this._renderIcon('right')}</span>
		);
	}
};

let ButtonView = Lib.merge({}, State, ButtonViewCore, ButtonViewObject);

ButtonView = Lib.runHelpers('react', CONTROL, ButtonView);
ButtonView = React.createClass(ButtonView);

export default ButtonView;
