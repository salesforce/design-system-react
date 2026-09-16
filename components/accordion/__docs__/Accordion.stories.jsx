import { useState } from 'react';
import IconSettings from '../../icon-settings';
import Accordion from '../';
import AccordionPanel from '../panel';

export default {
	title: 'Components/Accordion',
	component: Accordion,
	// argTypes drive the Controls panel and the autodocs props table. Modeled on the
	// upstream SLDS 2 Storybook's accordion story (`allow-multiple-sections-open`,
	// `active-section-name`).
	argTypes: {
		allowMultipleOpen: {
			control: { type: 'boolean' },
			description:
				'If true, multiple panels can be open at once. Otherwise, opening a panel closes the others.',
			table: { category: 'Behavior', defaultValue: { summary: 'false' } },
		},
		defaultExpandedId: {
			control: { type: 'select' },
			options: ['1', '2', '3'],
			description:
				'Id of the panel expanded on first render. Section ids are case-sensitive.',
			table: { category: 'Behavior', defaultValue: { summary: '1' } },
		},
		panels: {
			control: { type: 'object' },
			description: 'The panels to render, as `{ id, summary, content }` objects.',
			table: { category: 'Content' },
		},
	},
	args: {
		allowMultipleOpen: false,
		defaultExpandedId: '1',
		panels: [
			{ id: '1', summary: 'Accordion Panel 1', content: 'Panel 1 content goes here.' },
			{ id: '2', summary: 'Accordion Panel 2', content: 'Panel 2 content goes here.' },
			{ id: '3', summary: 'Accordion Panel 3', content: 'Panel 3 content goes here.' },
		],
	},
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium" style={{ maxWidth: '600px' }}>
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
};

// AccordionPanel is a controlled component: it renders `expanded` from its prop and
// calls `onTogglePanel` on click. The consumer owns the expanded state, so this
// wrapper tracks it and flips it on toggle, honoring the `allowMultipleOpen` arg.
const AccordionTemplate = ({ allowMultipleOpen, defaultExpandedId, panels }) => {
	const [expanded, setExpanded] = useState(
		defaultExpandedId ? { [defaultExpandedId]: true } : {}
	);

	const toggle = (id) =>
		setExpanded((prev) =>
			allowMultipleOpen ? { ...prev, [id]: !prev[id] } : { [id]: !prev[id] }
		);

	return (
		<Accordion id="accordion-example">
			{panels.map((panel) => (
				<AccordionPanel
					key={panel.id}
					id={panel.id}
					expanded={!!expanded[panel.id]}
					summary={panel.summary}
					onTogglePanel={() => toggle(panel.id)}
				>
					<p>{panel.content}</p>
				</AccordionPanel>
			))}
		</Accordion>
	);
};

// Default accordion — one panel open at a time (uses the default args above).
export const Default = {
	render: (args) => <AccordionTemplate {...args} />,
};

// Multiple panels expandable independently.
export const MultipleExpanded = {
	render: (args) => <AccordionTemplate {...args} />,
	args: {
		allowMultipleOpen: true,
		panels: [
			{ id: '1', summary: 'First Panel', content: 'First panel is expanded by default.' },
			{ id: '2', summary: 'Second Panel', content: 'Open a second panel without closing the first.' },
			{ id: '3', summary: 'Third Panel', content: 'Third panel is collapsed.' },
		],
	},
};

// Rich content — panels can hold arbitrary markup, not just text.
const RichContentStory = ({ allowMultipleOpen, defaultExpandedId }) => {
	const [expanded, setExpanded] = useState({ [defaultExpandedId]: true });
	const toggle = (id) =>
		setExpanded((prev) =>
			allowMultipleOpen ? { ...prev, [id]: !prev[id] } : { [id]: !prev[id] }
		);

	return (
		<Accordion id="rich-content-accordion">
			<AccordionPanel
				id="details"
				expanded={!!expanded.details}
				summary="Account Details"
				onTogglePanel={() => toggle('details')}
			>
				<dl className="slds-list_horizontal slds-wrap">
					<dt className="slds-item_label slds-text-color_weak slds-truncate">Name:</dt>
					<dd className="slds-item_detail slds-truncate">Acme Corporation</dd>
					<dt className="slds-item_label slds-text-color_weak slds-truncate">Industry:</dt>
					<dd className="slds-item_detail slds-truncate">Technology</dd>
				</dl>
			</AccordionPanel>
			<AccordionPanel
				id="contact"
				expanded={!!expanded.contact}
				summary="Contact Information"
				onTogglePanel={() => toggle('contact')}
			>
				<dl className="slds-list_horizontal slds-wrap">
					<dt className="slds-item_label slds-text-color_weak slds-truncate">Email:</dt>
					<dd className="slds-item_detail slds-truncate">contact@acme.com</dd>
					<dt className="slds-item_label slds-text-color_weak slds-truncate">Phone:</dt>
					<dd className="slds-item_detail slds-truncate">(555) 123-4567</dd>
				</dl>
			</AccordionPanel>
		</Accordion>
	);
};

export const WithRichContent = {
	render: (args) => <RichContentStory {...args} />,
	args: { defaultExpandedId: 'details' },
	// This story renders a fixed pair of panels, so hide the panels-array control.
	argTypes: { panels: { table: { disable: true } } },
	parameters: {
		docs: {
			description: {
				story: 'Panels can contain arbitrary markup (here, description lists).',
			},
		},
	},
};
