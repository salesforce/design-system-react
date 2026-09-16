import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import SLDSPill from '../../pill';
import SLDSIcon from '../../icon';
import SLDSAvatar from '../../avatar';

describe('SLDSPill', () => {
	const LABEL = 'Pill Label';
	const LABEL_TITLE = 'Full pill label verbiage mirrored here';

	describe('Linked', () => {
		it('has correct style and attributes', () => {
			const onClick = vi.fn();
			const onRemove = vi.fn();
			const onFocus = vi.fn();
			const onBlur = vi.fn();

			const { container } = render(
				<SLDSPill
					tabIndex="0"
					labels={{
						label: LABEL,
						title: LABEL_TITLE,
						removeTitle: 'Remove',
					}}
					assistiveText={{
						remove: 'Remove assistive text',
					}}
					className="extra-class"
					onClick={onClick}
					onRemove={onRemove}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
			);

			const pill = container.querySelector('.slds-pill');
			expect(pill).toHaveClass('slds-pill');
			expect(pill).toHaveClass('slds-pill_link');
			expect(pill).toHaveClass('extra-class');
			expect(container.querySelector('.slds-pill[role="button"]')).toBeInTheDocument();
		});

		it('renders label as a link', () => {
			const { container } = render(
				<SLDSPill
					labels={{
						label: LABEL,
						title: LABEL_TITLE,
					}}
				/>
			);

			const anchor = container.querySelector('.slds-pill__action');
			expect(anchor).toBeInTheDocument();
			expect(anchor).toHaveAttribute('title', LABEL_TITLE);
			const label = container.querySelector('.slds-pill__label');
			expect(label).toHaveTextContent(LABEL);
		});

		it('renders remove button', () => {
			const { container } = render(
				<SLDSPill
					labels={{
						label: LABEL,
					}}
					onRemove={vi.fn()}
				/>
			);

			const removeButton = container.querySelector('.slds-pill__remove');
			expect(removeButton).toBeInTheDocument();
		});

		it('renders assistive text in remove button', () => {
			const { container } = render(
				<SLDSPill
					labels={{
						label: LABEL,
					}}
					assistiveText={{
						remove: 'Remove assistive text',
					}}
					onRemove={vi.fn()}
				/>
			);

			const removeButton = container.querySelector('.slds-pill__remove');
			expect(removeButton).toBeInTheDocument();
			const assistiveText = removeButton.querySelector('.slds-assistive-text');
			expect(assistiveText).toBeInTheDocument();
			expect(assistiveText).toHaveTextContent('Remove assistive text');
		});

		it('focuses and blurs', () => {
			const onFocus = vi.fn();
			const onBlur = vi.fn();

			const { container } = render(
				<SLDSPill
					tabIndex="0"
					labels={{
						label: LABEL,
					}}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
			);

			const pill = container.querySelector('.slds-pill');
			fireEvent.focus(pill);
			expect(onFocus).toHaveBeenCalledTimes(1);
			fireEvent.blur(pill);
			expect(onBlur).toHaveBeenCalledTimes(1);
		});

		it('reponds to link clicks', () => {
			const onClick = vi.fn();

			const { container } = render(
				<SLDSPill
					labels={{
						label: LABEL,
					}}
					onClick={onClick}
				/>
			);

			const pillLink = container.querySelector('.slds-pill__action');
			expect(pillLink).toBeInTheDocument();
			fireEvent.click(pillLink);
			expect(onClick).toHaveBeenCalledTimes(1);
		});

		it('responds to remove clicks', () => {
			const onRemove = vi.fn();

			const { container } = render(
				<SLDSPill
					labels={{
						label: LABEL,
					}}
					onRemove={onRemove}
				/>
			);

			const removeButton = container.querySelector('.slds-pill__remove');
			expect(removeButton).toBeInTheDocument();
			fireEvent.click(removeButton);
			expect(onRemove).toHaveBeenCalledTimes(1);
		});
	});

	describe('Linked With Href', () => {
		it('uses href', () => {
			const HREF = 'https://www.salesforce.com';

			const { container } = render(
				<SLDSPill
					labels={{
						label: LABEL,
					}}
					href={HREF}
				/>
			);

			const pill = container.querySelector('.slds-pill');
			expect(pill).toHaveClass('slds-pill_link');
			const anchor = container.querySelector('.slds-pill__action');
			expect(anchor).toBeInTheDocument();
			expect(anchor).toHaveAttribute('href', HREF);
		});
	});

	describe('Link style on', () => {
		it('forces link style', () => {
			const { container } = render(
				<SLDSPill
					labels={{
						label: LABEL,
					}}
				/>
			);

			const pill = container.querySelector('.slds-pill');
			expect(pill).toHaveClass('slds-pill_link');
			const anchor = container.querySelector('.slds-pill__action');
			expect(anchor).toBeInTheDocument();
		});
	});

	describe('Bare Linked With Role', () => {
		it('has correct style and attributes', () => {
			const { container } = render(
				<SLDSPill
					labels={{
						label: LABEL,
					}}
					bare
				/>
			);

			const pill = container.querySelector('.slds-pill');
			expect(pill).toHaveClass('slds-pill');
			expect(pill).toHaveClass('slds-pill_bare');
			expect(container.querySelector('.slds-pill[role="button"]')).toBeInTheDocument();
		});
	});

	describe('Linked With Error', () => {
		it('has correct style and attributes', () => {
			const { container } = render(
				<SLDSPill
					labels={{
						label: LABEL,
					}}
					hasError
				/>
			);

			const pill = container.querySelector('.slds-pill');
			expect(pill).toHaveClass('slds-has-error');
		});
	});

	describe('Linked With Icon', () => {
		it('renders icon to the left from label', () => {
			const onClick = vi.fn();

			const { container } = render(
				<SLDSPill
					labels={{
						label: LABEL,
					}}
					onClick={onClick}
					icon={<SLDSIcon title="Account" category="standard" name="account" />}
				/>
			);

			const icon = container.querySelector('.slds-icon-standard-account');
			expect(icon).toBeInTheDocument();
		});
	});

	describe('Linked With Avatar', () => {
		it('renders avatar to the left from label', () => {
			const { container } = render(
				<SLDSPill
					labels={{
						label: LABEL,
					}}
					avatar={
						<SLDSAvatar
							variant="user"
							title="User avatar"
							imgSrc="https://lightningdesignsystem.com/assets/images/avatar2.jpg"
						/>
					}
				/>
			);

			const avatar = container.querySelector('.slds-avatar');
			expect(avatar).toBeInTheDocument();
			const avatarImg = container.querySelector('.slds-avatar img');
			expect(avatarImg).toHaveAttribute(
				'src',
				'https://lightningdesignsystem.com/assets/images/avatar2.jpg'
			);
		});
	});

	describe('Option', () => {
		it('has correct style', () => {
			const onRemove = vi.fn();

			const { container } = render(
				<SLDSPill
					labels={{
						label: LABEL,
						title: LABEL_TITLE,
						removeTitle: 'Remove',
					}}
					variant="option"
					onRemove={onRemove}
				/>
			);

			const pill = container.querySelector('.slds-pill');
			expect(pill).toHaveClass('slds-pill');
			expect(pill).not.toHaveClass('slds-pill_link');
			const anchor = container.querySelector('.slds-pill__action');
			expect(anchor).not.toBeInTheDocument();
		});
	});

	describe('Linked Custom', () => {
		it('has correct style', () => {
			const onClick = vi.fn();
			const onRemove = vi.fn();

			const { container } = render(
				<SLDSPill onClick={onClick} onRemove={onRemove}>
					<div className="abc">this is a custom label</div>
				</SLDSPill>
			);

			const pill = container.querySelector('.slds-pill');
			expect(pill).toHaveClass('slds-pill');
			expect(pill).toHaveClass('slds-pill_link');
			const child = container.querySelector('.abc');
			expect(child).toBeInTheDocument();
			expect(child).toHaveTextContent('this is a custom label');
		});

		it('renders remove button', () => {
			const onClick = vi.fn();
			const onRemove = vi.fn();

			const { container } = render(
				<SLDSPill onClick={onClick} onRemove={onRemove}>
					<div className="abc">this is a custom label</div>
				</SLDSPill>
			);

			const removeButton = container.querySelector('.slds-pill__remove');
			expect(removeButton).toBeInTheDocument();
		});

		it('reponds to link clicks', () => {
			const onClick = vi.fn();
			const onRemove = vi.fn();

			const { container } = render(
				<SLDSPill onClick={onClick} onRemove={onRemove}>
					<div className="abc">this is a custom label</div>
				</SLDSPill>
			);

			const pill = container.querySelector('.slds-pill');
			expect(pill).toBeInTheDocument();
			fireEvent.click(pill);
			expect(onClick).toHaveBeenCalledTimes(1);
		});

		it('responds to remove clicks', () => {
			const onClick = vi.fn();
			const onRemove = vi.fn();

			const { container } = render(
				<SLDSPill onClick={onClick} onRemove={onRemove}>
					<div className="abc">this is a custom label</div>
				</SLDSPill>
			);

			const removeButton = container.querySelector('.slds-pill__remove');
			expect(removeButton).toBeInTheDocument();
			fireEvent.click(removeButton);
			expect(onRemove).toHaveBeenCalledTimes(1);
		});
	});
});
