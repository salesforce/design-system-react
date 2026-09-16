/* eslint-disable react/display-name, jsx-a11y/no-noninteractive-tabindex */

import React from 'react';
import IconSettings from '../../icon-settings';

import Tooltip from '../../tooltip';
import Icon from '../../icon';
import Button from '../../button';
import ButtonGroup from '../../button-group';

export default {
	title: 'Components/Tooltip',
	component: Tooltip,
	decorators: [
		(Story) => (
			<div
				className="slds-p-around_medium slds-m-horizontal_x-large"
				style={{
					margin: '150px auto',
					width: '500px',
				}}
			>
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	parameters: {
		docs: {
			description: {
				component: `The Tooltip component displays contextual information on hover or focus. It wraps a trigger element (button, link, or any focusable element) and shows a small popover with additional information.

**Accessibility**: The trigger element must be focusable (have tabIndex or be naturally focusable like buttons/anchors) so keyboard users can access the tooltip.`,
			},
		},
	},
	argTypes: {
		align: {
			control: 'select',
			options: [
				'top',
				'top left',
				'top right',
				'right',
				'right top',
				'right bottom',
				'bottom',
				'bottom left',
				'bottom right',
				'left',
				'left top',
				'left bottom',
			],
			description: 'Alignment of the Tooltip relative to the trigger element',
		},
		theme: {
			control: 'select',
			options: ['info', 'error'],
			description: 'Theme of tooltip: info (blue) or error (red)',
		},
		variant: {
			control: 'select',
			options: ['base', 'learnMore', 'list-item'],
			description: 'Determines the type of the tooltip',
		},
		position: {
			control: 'select',
			options: ['absolute', 'overflowBoundaryElement', 'relative'],
			description: 'Positioning strategy for the tooltip',
		},
		hoverOpenDelay: {
			control: 'number',
			description: 'Delay in milliseconds before tooltip opens',
		},
		hoverCloseDelay: {
			control: 'number',
			description: 'Delay in milliseconds before tooltip closes',
		},
		isOpen: {
			control: 'boolean',
			description: 'Forces tooltip to be open',
		},
		hasAnchoredNubbin: {
			control: 'boolean',
			description: 'Use anchored nubbin attached to trigger',
		},
		hasStaticAlignment: {
			control: 'boolean',
			description: 'Disable automatic alignment flipping',
		},
	},
};

const tooltipContent =
	'Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.';

// Default story
export const Default = {
	args: {
		content: tooltipContent,
		align: 'top',
	},
	render: (args) => (
		<Tooltip {...args}>
			<Button label="Hover Me" />
		</Tooltip>
	),
};

// Open state (for visual testing)
export const Open = {
	args: {
		content: tooltipContent,
		align: 'bottom',
		isOpen: true,
		id: 'tooltip-open',
		dialogClassName: 'dialog-classname',
	},
	render: (args) => (
		<Tooltip {...args}>
			<Button label="Trigger Tooltip" />
		</Tooltip>
	),
};

// Theme variants
export const InfoTheme = {
	args: {
		content: 'This is an informational tooltip',
		theme: 'info',
		isOpen: true,
		align: 'bottom',
	},
	render: (args) => (
		<Tooltip {...args}>
			<Button label="Info Theme" />
		</Tooltip>
	),
};

export const ErrorTheme = {
	args: {
		content: 'This is an error/warning tooltip',
		theme: 'error',
		isOpen: true,
		align: 'bottom',
	},
	render: (args) => (
		<Tooltip {...args}>
			<Button label="Error Theme" variant="destructive" />
		</Tooltip>
	),
};

// Learn More variant
export const LearnMore = {
	args: {
		content: 'Click the info icon to learn more about this feature.',
		variant: 'learnMore',
		align: 'right',
	},
	render: (args) => (
		<Tooltip
			{...args}
			onClickTrigger={(e) => {
				e.preventDefault();
				console.log('Learn more clicked');
			}}
		/>
	),
	parameters: {
		docs: {
			description: {
				story: 'The Learn More variant displays an info icon as the trigger. When no children are provided and `onClickTrigger` is set, it renders as a clickable link.',
			},
		},
	},
};

// All alignments
export const AllAlignments = {
	render: () => {
		const alignments = [
			'top',
			'top left',
			'top right',
			'right',
			'right top',
			'right bottom',
			'bottom',
			'bottom left',
			'bottom right',
			'left',
			'left top',
			'left bottom',
		];

		return (
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '60px', padding: '80px' }}>
				{alignments.map((alignment) => (
					<div key={alignment} style={{ textAlign: 'center' }}>
						<Tooltip
							content={`Aligned: ${alignment}`}
							align={alignment}
							isOpen
							id={`tooltip-${alignment.replace(' ', '-')}`}
						>
							<Button label={alignment} />
						</Tooltip>
					</div>
				))}
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Tooltips can be aligned in 12 different positions relative to the trigger element.',
			},
		},
	},
};

// With Icon trigger
export const WithIconTrigger = {
	args: {
		content: 'This is a case record',
		align: 'right',
		isOpen: true,
	},
	render: (args) => (
		<Tooltip {...args}>
			<Icon
				assistiveText={{ label: 'Case Icon' }}
				category="standard"
				name="case"
				size="small"
				tabIndex="0"
			/>
		</Tooltip>
	),
};

// With span trigger
export const WithSpanTrigger = {
	args: {
		content: 'You can use any focusable element as a trigger',
		align: 'bottom',
		isOpen: true,
	},
	render: (args) => (
		<Tooltip {...args}>
			<span tabIndex="0" style={{ textDecoration: 'underline', cursor: 'help' }}>
				Hover over this text
			</span>
		</Tooltip>
	),
};

// With delay
export const WithDelay = {
	args: {
		content: tooltipContent,
		hoverOpenDelay: 500,
		hoverCloseDelay: 300,
		align: 'bottom',
	},
	render: (args) => (
		<Tooltip {...args}>
			<Button label="Hover (500ms delay)" />
		</Tooltip>
	),
	parameters: {
		docs: {
			description: {
				story: 'You can configure open and close delays. This example has a 500ms open delay and 300ms close delay.',
			},
		},
	},
};

// With anchored nubbin
export const AnchoredNubbin = {
	args: {
		content: tooltipContent,
		hasAnchoredNubbin: true,
		hasStaticAlignment: true,
		align: 'bottom',
		isOpen: true,
	},
	render: (args) => (
		<Tooltip {...args}>
			<Button label="Anchored Nubbin" />
		</Tooltip>
	),
	parameters: {
		docs: {
			description: {
				story: 'The anchored nubbin variant attaches the arrow directly to the trigger element. Use `hasStaticAlignment: true` with this feature.',
			},
		},
	},
};

// In Button Group
export const InButtonGroup = {
	render: () => (
		<ButtonGroup>
			<Tooltip content="Edit this record" align="bottom">
				<Button
					assistiveText={{ icon: 'Edit' }}
					iconCategory="utility"
					iconName="edit"
					iconVariant="border"
					variant="icon"
				/>
			</Tooltip>
			<Tooltip content="Delete this record" align="bottom">
				<Button
					assistiveText={{ icon: 'Delete' }}
					iconCategory="utility"
					iconName="delete"
					iconVariant="border"
					variant="icon"
				/>
			</Tooltip>
			<Tooltip content="Refresh data" align="bottom">
				<Button
					assistiveText={{ icon: 'Refresh' }}
					iconCategory="utility"
					iconName="refresh"
					iconVariant="border"
					variant="icon"
				/>
			</Tooltip>
		</ButtonGroup>
	),
	parameters: {
		docs: {
			description: {
				story: 'Tooltips work well with icon buttons in a button group to provide context about each action.',
			},
		},
	},
};

// Controlled state
export const Controlled = {
	render: () => {
		const [isOpen, setIsOpen] = React.useState(false);

		return (
			<div>
				<div style={{ marginBottom: '20px' }}>
					<Button
						label={isOpen ? 'Hide Tooltip' : 'Show Tooltip'}
						onClick={() => setIsOpen(!isOpen)}
					/>
				</div>
				<Tooltip
					content={tooltipContent}
					isOpen={isOpen}
					align="bottom"
				>
					<Button label="Controlled Tooltip" />
				</Tooltip>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Use the `isOpen` prop to control tooltip visibility programmatically. When set, hover/focus behavior is disabled.',
			},
		},
	},
};

// Default trigger (no children)
export const DefaultTrigger = {
	args: {
		content: 'Helpful information about this feature',
		align: 'right',
	},
	render: (args) => <Tooltip {...args} />,
	parameters: {
		docs: {
			description: {
				story: 'When no children are provided, Tooltip renders a default info icon button as the trigger.',
			},
		},
	},
};
