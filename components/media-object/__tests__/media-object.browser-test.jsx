import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
// `this.wrapper` and `this.dom` is set in the helpers file
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';

import MediaObject from '../../media-object';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';

import { MEDIA_OBJECT } from '../../../utilities/constants';

chai.use(chaiEnzyme());

const COMPONENT_CSS_CLASSES = {
	base: 'slds-media',
	figure: 'slds-media__figure',
	body: 'slds-media__body',
};

const DemoComponent = (props) => (
	<IconSettings iconPath="/assets/icons">
		<MediaObject {...props} />
	</IconSettings>
);
DemoComponent.displayName = 'DemoMediaObject';

describe(`${MEDIA_OBJECT}: `, () => {
	/*
		Tests
	 */
	describe('Default Structure and CSS', () => {
		beforeEach(
			mountComponent(
				<DemoComponent
					body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda."
					className="this-is-a-container-test"
					figure={<Icon category="standard" name="user" size="medium" />}
				/>
			)
		);

		afterEach(unmountComponent);

		it('has container class, body and figure', function () {
			const container = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.base}`);
			expect(container.hasClass('this-is-a-container-test')).to.be.true;

			const body = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.body}`);
			const bodyText = body.text();
			expect(bodyText).to.equal(
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda.'
			);

			const figure = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.figure}`);
			const icon = figure.find('.slds-icon-standard-user');
			expect(icon.hasClass('slds-icon-standard-user')).to.be.true;
		});
	});

	describe('Additional Structure', () => {
		beforeEach(
			mountComponent(
				<DemoComponent
					figure={<Icon category="standard" name="user" size="medium" />}
					verticalCenter
					canTruncate
				/>
			)
		);

		afterEach(unmountComponent);

		it('has media vertical center class', function () {
			const container = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.base}`);
			expect(container.hasClass('slds-media_center')).to.be.true;
		});

		it('can truncate within Flexbox layout', function () {
			const container = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.base}`);
			expect(container.hasClass('slds-has-flexi-truncate')).to.be.true;
		});
	});
});
