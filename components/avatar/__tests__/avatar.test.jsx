import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Avatar from '../';
import IconSettings from '../../icon-settings';

describe('SLDSAvatar', () => {
	describe('Default Structure', () => {
		it('avatar renders with image', () => {
			const expectedSrc = 'assets/images/global-header/logo.svg';
			const { container } = render(<Avatar imgSrc={expectedSrc} />);

			const img = container.querySelector('img');
			expect(img).toBeInTheDocument();
			expect(img).toHaveAttribute('src', expectedSrc);
		});

		it('renders proper icon size class', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Avatar size="large" />
				</IconSettings>
			);

			const avatar = container.querySelector('.slds-avatar_large');
			expect(avatar).toBeInTheDocument();
		});

		describe('variant is a user', () => {
			it('displays as a circle', () => {
				const { container } = render(
					<IconSettings iconPath="/assets/icons">
						<Avatar variant="user" />
					</IconSettings>
				);

				const avatar = container.querySelector('.slds-avatar_circle');
				expect(avatar).toBeInTheDocument();
			});
		});

		describe('variant is an entity', () => {
			it('displays as a square (no circle class)', () => {
				const { container } = render(
					<IconSettings iconPath="/assets/icons">
						<Avatar variant="entity" />
					</IconSettings>
				);

				const avatar = container.querySelector('.slds-avatar_circle');
				expect(avatar).not.toBeInTheDocument();
			});
		});
	});

	describe('Initials avatar fallback check', () => {
		it('renders "initials prop" initials if they are passed in directly', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Avatar initials="AW" />
				</IconSettings>
			);

			const abbr = container.querySelector('abbr');
			expect(abbr).toBeInTheDocument();
			expect(abbr.textContent).toBe('AW');
		});

		it('renders fallback initials abbr node if initials or label prop exists', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Avatar label="test" />
				</IconSettings>
			);

			const abbr = container.querySelector('abbr');
			expect(abbr).toBeInTheDocument();
		});

		it('calls buildInitials in abbr node if no initials prop', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Avatar label="Jane Doe" />
				</IconSettings>
			);

			const abbr = container.querySelector('abbr');
			expect(abbr).toBeInTheDocument();
			expect(abbr.textContent).toBe('JD');
		});

		it('renders first two letters of one word if label is one word', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Avatar label="Acme" />
				</IconSettings>
			);

			const abbr = container.querySelector('abbr');
			expect(abbr).toBeInTheDocument();
			expect(abbr.textContent).toBe('Ac');
		});

		it('renders first letters of each word if label is two words', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Avatar label="Acme Communications" />
				</IconSettings>
			);

			const abbr = container.querySelector('abbr');
			expect(abbr).toBeInTheDocument();
			expect(abbr.textContent).toBe('AC');
		});

		it('renders first letters of first and last word if label is more than two words', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Avatar label="Acme Communications Inc." />
				</IconSettings>
			);

			const abbr = container.querySelector('abbr');
			expect(abbr).toBeInTheDocument();
			expect(abbr.textContent).toBe('AI');
		});
	});

	describe('Icon avatar fallback check', () => {
		it('renders expected assistiveText', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Avatar
						variant="entity"
						assistiveText={{ icon: 'entity icon avatar' }}
					/>
				</IconSettings>
			);

			const span = container.querySelector('.slds-assistive-text');
			expect(span).toBeInTheDocument();
			expect(span.textContent).toBe('entity icon avatar');
		});

		it('renders account icon', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Avatar variant="entity" />
				</IconSettings>
			);

			const accountIcon = container.querySelector('.slds-icon-standard-account');
			expect(accountIcon).toBeInTheDocument();
		});

		it('renders user icon', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Avatar variant="user" />
				</IconSettings>
			);

			const userIcon = container.querySelector('.slds-icon-standard-user');
			expect(userIcon).toBeInTheDocument();
		});
	});
});
