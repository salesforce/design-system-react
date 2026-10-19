import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import MediaObject from '../';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';

const COMPONENT_CSS_CLASSES = {
	base: 'slds-media',
	figure: 'slds-media__figure',
	body: 'slds-media__body',
};

describe('MediaObject', () => {
	describe('Default Structure and CSS', () => {
		it('has container class, body and figure', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<MediaObject
						body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda."
						className="this-is-a-container-test"
						figure={<Icon category="standard" name="user" size="medium" />}
					/>
				</IconSettings>
			);

			const mediaContainer = container.querySelector(
				`.${COMPONENT_CSS_CLASSES.base}`
			);
			expect(mediaContainer).toBeInTheDocument();
			expect(mediaContainer).toHaveClass('this-is-a-container-test');

			const body = container.querySelector(`.${COMPONENT_CSS_CLASSES.body}`);
			expect(body).toBeInTheDocument();
			expect(body.textContent).toBe(
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda.'
			);

			const figure = container.querySelector(
				`.${COMPONENT_CSS_CLASSES.figure}`
			);
			expect(figure).toBeInTheDocument();
			const icon = figure.querySelector('.slds-icon-standard-user');
			expect(icon).toBeInTheDocument();
		});
	});

	describe('Additional Structure', () => {
		it('has media vertical center class', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<MediaObject
						figure={<Icon category="standard" name="user" size="medium" />}
						isVerticallyCentered
						canTruncate
					/>
				</IconSettings>
			);

			const mediaContainer = container.querySelector(
				`.${COMPONENT_CSS_CLASSES.base}`
			);
			expect(mediaContainer).toHaveClass('slds-media_center');
		});

		it('can truncate within Flexbox layout', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<MediaObject
						figure={<Icon category="standard" name="user" size="medium" />}
						isVerticallyCentered
						canTruncate
					/>
				</IconSettings>
			);

			const mediaContainer = container.querySelector(
				`.${COMPONENT_CSS_CLASSES.base}`
			);
			expect(mediaContainer).toHaveClass('slds-has-flexi-truncate');
		});
	});

	describe('Deprecated props', () => {
		it('still applies `verticalCenter` and warns to use `isVerticallyCentered`', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const { container } = render(<MediaObject body="Body" verticalCenter />);

			expect(
				container.querySelector(`.${COMPONENT_CSS_CLASSES.base}`)
			).toHaveClass('slds-media_center');
			expect(consoleError).toHaveBeenCalledWith(
				expect.stringContaining('Use `isVerticallyCentered` instead.')
			);
			consoleError.mockRestore();
		});
	});
});
