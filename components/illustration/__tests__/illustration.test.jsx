import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Illustration from '../index';

class DemoIllustration extends React.Component {
	static displayName = 'DemoIllustration';

	render() {
		return <Illustration {...this.props} silenceDeprecationWarning />;
	}
}

describe('SLDSIllustration', () => {
	describe('Image with heading and message render', () => {
		it('renders container class', () => {
			const { container } = render(
				<DemoIllustration
					className="custom-illustration"
					internalIllustration
					heading="Lorem ipsum dolor"
					messageBody="Lorem ipsum dolor sit amet, consectetur"
					name="No Access"
					path="/assets/images/illustrations/empty-state-no-access.svg#no-access"
					size="small"
					style={{ backgroundColor: 'rgb(218, 165, 32)' }}
				/>
			);

			expect(container.querySelector('.slds-illustration')).toBeInTheDocument();
			expect(container.querySelector('.custom-illustration')).toBeInTheDocument();
		});

		it('renders illustration size class', () => {
			const { container } = render(
				<DemoIllustration
					className="custom-illustration"
					internalIllustration
					heading="Lorem ipsum dolor"
					messageBody="Lorem ipsum dolor sit amet, consectetur"
					name="No Access"
					path="/assets/images/illustrations/empty-state-no-access.svg#no-access"
					size="small"
					style={{ backgroundColor: 'rgb(218, 165, 32)' }}
				/>
			);

			expect(container.querySelector('.slds-illustration_small')).toBeInTheDocument();
		});

		it('sets svg aria-hidden to true', () => {
			const { container } = render(
				<DemoIllustration
					className="custom-illustration"
					internalIllustration
					heading="Lorem ipsum dolor"
					messageBody="Lorem ipsum dolor sit amet, consectetur"
					name="No Access"
					path="/assets/images/illustrations/empty-state-no-access.svg#no-access"
					size="small"
					style={{ backgroundColor: 'rgb(218, 165, 32)' }}
				/>
			);

			const svg = container.querySelector('svg');
			expect(svg).toHaveAttribute('aria-hidden', 'true');
		});

		it('renders illustration svg class', () => {
			const { container } = render(
				<DemoIllustration
					className="custom-illustration"
					internalIllustration
					heading="Lorem ipsum dolor"
					messageBody="Lorem ipsum dolor sit amet, consectetur"
					name="No Access"
					path="/assets/images/illustrations/empty-state-no-access.svg#no-access"
					size="small"
					style={{ backgroundColor: 'rgb(218, 165, 32)' }}
				/>
			);

			const svg = container.querySelector('svg');
			expect(svg).toHaveClass('slds-illustration__svg');
		});

		it('renders svg name attribute', () => {
			// also tests that all '_' and ' ' are replaced with '-'
			const { container } = render(
				<DemoIllustration
					className="custom-illustration"
					internalIllustration
					heading="Lorem ipsum dolor"
					messageBody="Lorem ipsum dolor sit amet, consectetur"
					name="No Access"
					path="/assets/images/illustrations/empty-state-no-access.svg#no-access"
					size="small"
					style={{ backgroundColor: 'rgb(218, 165, 32)' }}
				/>
			);

			const svg = container.querySelector('svg');
			expect(svg).toHaveAttribute('name', 'no-access');
		});

		it('renders svg custom background color', () => {
			const { container } = render(
				<DemoIllustration
					className="custom-illustration"
					internalIllustration
					heading="Lorem ipsum dolor"
					messageBody="Lorem ipsum dolor sit amet, consectetur"
					name="No Access"
					path="/assets/images/illustrations/empty-state-no-access.svg#no-access"
					size="small"
					style={{ backgroundColor: 'rgb(218, 165, 32)' }}
				/>
			);

			const svg = container.querySelector('svg');
			expect(svg).toHaveStyle({ backgroundColor: 'rgb(218, 165, 32)' });
		});

		it('renders heading', () => {
			const { container } = render(
				<DemoIllustration
					className="custom-illustration"
					internalIllustration
					heading="Lorem ipsum dolor"
					messageBody="Lorem ipsum dolor sit amet, consectetur"
					name="No Access"
					path="/assets/images/illustrations/empty-state-no-access.svg#no-access"
					size="small"
					style={{ backgroundColor: 'rgb(218, 165, 32)' }}
				/>
			);

			const heading = container.querySelector('.slds-text-heading_medium');
			expect(heading.textContent).toBe('Lorem ipsum dolor');
		});

		it('renders message body', () => {
			const { container } = render(
				<DemoIllustration
					className="custom-illustration"
					internalIllustration
					heading="Lorem ipsum dolor"
					messageBody="Lorem ipsum dolor sit amet, consectetur"
					name="No Access"
					path="/assets/images/illustrations/empty-state-no-access.svg#no-access"
					size="small"
					style={{ backgroundColor: 'rgb(218, 165, 32)' }}
				/>
			);

			const messageBody = container.querySelector('.slds-text-body_regular');
			expect(messageBody.textContent).toBe('Lorem ipsum dolor sit amet, consectetur');
		});
	});

	describe('Heading and message render', () => {
		it('does not render svg', () => {
			const { container } = render(
				<DemoIllustration
					internalIllustration
					heading="Lorem ipsum dolor"
					messageBody="Lorem ipsum dolor sit amet, consectetur"
				/>
			);

			const svg = container.querySelector('svg');
			expect(svg).not.toBeInTheDocument();
		});

		it('renders heading', () => {
			const { container } = render(
				<DemoIllustration
					internalIllustration
					heading="Lorem ipsum dolor"
					messageBody="Lorem ipsum dolor sit amet, consectetur"
				/>
			);

			const heading = container.querySelector('.slds-text-heading_medium');
			expect(heading.textContent).toBe('Lorem ipsum dolor');
		});

		it('renders message body', () => {
			const { container } = render(
				<DemoIllustration
					internalIllustration
					heading="Lorem ipsum dolor"
					messageBody="Lorem ipsum dolor sit amet, consectetur"
				/>
			);

			const messageBody = container.querySelector('.slds-text-body_regular');
			expect(messageBody.textContent).toBe('Lorem ipsum dolor sit amet, consectetur');
		});
	});

	describe('Heading only renders', () => {
		it('does not render svg', () => {
			const { container } = render(
				<DemoIllustration internalIllustration heading="Lorem ipsum dolor" />
			);

			const svg = container.querySelector('svg');
			expect(svg).not.toBeInTheDocument();
		});

		it('renders heading', () => {
			const { container } = render(
				<DemoIllustration internalIllustration heading="Lorem ipsum dolor" />
			);

			const heading = container.querySelector('.slds-text-heading_medium');
			expect(heading.textContent).toBe('Lorem ipsum dolor');
		});

		it('does not render message body', () => {
			const { container } = render(
				<DemoIllustration internalIllustration heading="Lorem ipsum dolor" />
			);

			expect(container.querySelector('.slds-text-body_regular')).not.toBeInTheDocument();
		});
	});

	describe('Message only renders', () => {
		it('does not render svg', () => {
			const { container } = render(
				<DemoIllustration
					internalIllustration
					messageBody="Lorem ipsum dolor sit amet, consectetur"
				/>
			);

			const svg = container.querySelector('svg');
			expect(svg).not.toBeInTheDocument();
		});

		it('does not render heading', () => {
			const { container } = render(
				<DemoIllustration
					internalIllustration
					messageBody="Lorem ipsum dolor sit amet, consectetur"
				/>
			);

			const heading = container.querySelector('.slds-text-heading_medium');
			expect(heading).not.toBeInTheDocument();
		});

		it('renders message body', () => {
			const { container } = render(
				<DemoIllustration
					internalIllustration
					messageBody="Lorem ipsum dolor sit amet, consectetur"
				/>
			);

			const messageBody = container.querySelector('.slds-text-body_regular');
			expect(messageBody.textContent).toBe('Lorem ipsum dolor sit amet, consectetur');
		});
	});
});
