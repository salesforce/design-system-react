import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '~/components/icon-settings';
import { PILL } from '~/utilities/constants';
import Pill from '~/components/pill';
import Icon from '~/components/icon';
import Avatar from '~/components/avatar';

function noop () {
}

storiesOf(PILL, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium"><IconSettings iconPath="/assets/icons">{getStory()}</IconSettings></div>)
	.add('Linked', () => (
		<Pill
			labels={{
				label: 'Pill Label',
				title: 'Full pill label verbiage mirrored here',
				removeTitle: 'Remove'
			}}
			onClick={noop}
			onRemove={noop}
		/>
	))
	.add('Unlinked', () => (
		<Pill
			labels={{
				label: 'Pill Label',
				title: 'Full pill label verbiage mirrored here',
				removeTitle: 'Remove'
			}}
			onRemove={noop}
		/>
	))
	.add('With Icon', () => (
		<Pill
			labels={{
				label: 'Pill Label',
				title: 'Full pill label verbiage mirrored here',
				removeTitle: 'Remove'
			}}
			icon={
				<Icon
					title="Account"
					category="standard"
					name="account"
				/>
			}
			onClick={noop}
			onRemove={noop}
		/>
	))
	.add('With Avatar', () => (
		<Pill
			labels={{
				label: 'Pill Label',
				title: 'Full pill label verbiage mirrored here',
				removeTitle: 'Remove'
			}}
			avatar={
				<Avatar
					variant="user"
					title="User avatar"
					imgSrc="https://lightningdesignsystem.com/assets/images/avatar2.jpg"
				/>
			}
			onClick={noop}
			onRemove={noop}
		/>
	))
	.add('Error', () => (
		<Pill
			labels={{
				label: 'Pill Label',
				title: 'Full pill label verbiage mirrored here',
				removeTitle: 'Remove'
			}}
			hasError
			icon={
				<Icon
					title="Error"
					category="utility"
					name="warning"
					className="slds-icon-text-error"
				/>
			}
			onClick={noop}
			onRemove={noop}
		/>
	))
	.add('Truncated', () => (
		<div style={{ width: '220px', position: 'relative' }}>
			<div className="slds-pill_container">
				<Pill
					labels={{
						label: 'Pill label that is longer than the area that contains it',
						removeTitle: 'Remove'
					}}
					onClick={noop}
					onRemove={noop}
				/>
			</div>
		</div>
	))
	.add('With Container', () => (
		<div className="slds-pill_container">
			<Pill
				labels={{
					label: 'Pill Label',
					title: 'Full pill label verbiage mirrored here',
					removeTitle: 'Remove'
				}}
				onClick={noop}
				onRemove={noop}
			/>
			<Pill
				labels={{
					label: 'Pill Label',
					title: 'Full pill label verbiage mirrored here',
					removeTitle: 'Remove'
				}}
				onClick={noop}
				onRemove={noop}
			/>
			<Pill
				labels={{
					label: 'Pill Label',
					title: 'Full pill label verbiage mirrored here',
					removeTitle: 'Remove'
				}}
				onClick={noop}
				onRemove={noop}
			/>
		</div>
	))
	.add('Bare', () => (
		<div className="slds-pill_container">
			<ul className="slds-listbox slds-listbox_horizontal slds-listbox_inline" role="listbox" aria-label="Selected Options:" aria-orientation="horizontal">
				<li className="slds-listbox-item" role="presentation">
					<Pill
						labels={{
							label: 'Pill Label',
							title: 'Full pill label verbiage mirrored here',
							removeTitle: 'Remove'
						}}
						assistiveText={{
							remove: 'Press delete or backspace to remove'
						}}
						bare
						role="option"
						tabIndex="0"
						aria-selected="true"
						onRemove={noop}
					/>
				</li>
				<li className="slds-listbox-item" role="presentation">
					<Pill
						labels={{
							label: 'Pill Label',
							title: 'Full pill label verbiage mirrored here',
							removeTitle: 'Remove'
						}}
						assistiveText={{
							remove: 'Press delete or backspace to remove'
						}}
						bare
						role="option"
						aria-selected="true"
						onRemove={noop}
					/>
				</li>
			</ul>
		</div>
	))
	.add('Listbox Of Pill Options', () => (
		<div className="slds-pill_container">
			<ul className="slds-listbox slds-listbox_horizontal slds-listbox_inline" role="listbox" aria-label="Selected Options:" aria-orientation="horizontal">
				<li className="slds-listbox-item" role="presentation">
					<Pill
						labels={{
							label: 'Pill Label',
							title: 'Full pill label verbiage mirrored here',
							removeTitle: 'Remove'
						}}
						assistiveText={{
							remove: 'Press delete or backspace to remove'
						}}
						role="option"
						tabIndex="0"
						onClick={noop}
						onRemove={noop}
					/>

				</li>
				<li className="slds-listbox-item" role="presentation">
					<Pill
						labels={{
							label: 'Pill Label',
							title: 'Full pill label verbiage mirrored here',
							removeTitle: 'Remove'
						}}
						assistiveText={{
							remove: 'Press delete or backspace to remove'
						}}
						role="option"
						onClick={noop}
						onRemove={noop}
					/>
				</li>
			</ul>
		</div>
	))
	.add('Listbox Of Pill Options With Icon', () => (
		<div className="slds-pill_container">
			<ul className="slds-listbox slds-listbox_horizontal slds-listbox_inline" role="listbox" aria-label="Selected Options:" aria-orientation="horizontal">
				<li className="slds-listbox-item" role="presentation">
					<Pill
						labels={{
							label: 'Pill Label',
							title: 'Full pill label verbiage mirrored here',
							removeTitle: 'Remove'
						}}
						assistiveText={{
							remove: 'Press delete or backspace to remove'
						}}
						role="option"
						tabIndex="0"
						icon={
							<Icon
								title="Account"
								category="standard"
								name="account"
							/>
						}
						onClick={noop}
						onRemove={noop}
					/>

				</li>
				<li className="slds-listbox-item" role="presentation">
					<Pill
						labels={{
							label: 'Pill Label',
							title: 'Full pill label verbiage mirrored here',
							removeTitle: 'Remove'
						}}
						assistiveText={{
							remove: 'Press delete or backspace to remove'
						}}
						role="option"
						icon={
							<Icon
								title="Case"
								category="standard"
								name="case"
							/>
						}
						onClick={noop}
						onRemove={noop}
					/>
				</li>
			</ul>
		</div>
	))
	.add('Listbox Of Pill Options With Avatar', () => (
		<div className="slds-pill_container">
			<ul className="slds-listbox slds-listbox_horizontal slds-listbox_inline" role="listbox" aria-label="Selected Options:" aria-orientation="horizontal">
				<li className="slds-listbox-item" role="presentation">
					<Pill
						labels={{
							label: 'Pill Label',
							title: 'Full pill label verbiage mirrored here',
							removeTitle: 'Remove'
						}}
						assistiveText={{
							remove: 'Press delete or backspace to remove'
						}}
						role="option"
						tabIndex="0"
						avatar={
							<Avatar
								variant="user"
								title="User avatar"
								imgSrc="https://lightningdesignsystem.com/assets/images/avatar2.jpg"
							/>
						}
						onClick={noop}
						onRemove={noop}
					/>

				</li>
				<li className="slds-listbox-item" role="presentation">
					<Pill
						labels={{
							label: 'Pill Label',
							title: 'Full pill label verbiage mirrored here',
							removeTitle: 'Remove'
						}}
						assistiveText={{
							remove: 'Press delete or backspace to remove'
						}}
						role="option"
						avatar={
							<Avatar
								variant="user"
								title="User avatar"
								imgSrc="https://lightningdesignsystem.com/assets/images/avatar2.jpg"
							/>
						}
						onClick={noop}
						onRemove={noop}
					/>
				</li>
			</ul>
		</div>
	));
