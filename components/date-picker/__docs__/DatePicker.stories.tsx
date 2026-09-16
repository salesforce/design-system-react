import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import DatePicker from '../index';
import IconSettings from '../../icon-settings';
import UNSAFE_DirectionSettings from '../../utilities/UNSAFE_direction';

// Simple date formatter (M/D/YYYY)
const formatDate = (date: Date | null | undefined): string => {
	if (!date) return '';
	return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

// Simple date parser
const parseDate = (dateString: string): Date => {
	const parts = dateString.split(/[/-]/);
	if (parts.length === 3) {
		const month = parseInt(parts[0], 10) - 1;
		const day = parseInt(parts[1], 10);
		const year = parseInt(parts[2], 10);
		return new Date(year, month, day);
	}
	return new Date(dateString);
};

// European format (D/M/YYYY)
const formatDateEuropean = (date: Date | null | undefined): string => {
	if (!date) return '';
	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const meta: Meta<typeof DatePicker> = {
	title: 'Components/DatePicker',
	component: DatePicker,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	parameters: {
		docs: {
			description: {
				component:
					'A date picker is a non-text input form element. You can select a single date from a popup calendar.',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Default story with controlled component
const DefaultComponent = () => {
	const [value, setValue] = useState<Date | undefined>(undefined);

	return (
		<DatePicker
			labels={{
				label: 'Date',
			}}
			onChange={(event, data) => {
				console.log('onChange', data);
				setValue(data.date);
			}}
			onCalendarFocus={(event, data) => {
				console.log('onCalendarFocus', data);
			}}
			formatter={formatDate}
			parser={parseDate}
			value={value}
		/>
	);
};

export const Default: Story = {
	render: () => <DefaultComponent />,
};

// ISO Weekdays - Monday first
const ISOWeekdaysComponent = () => {
	const [value, setValue] = useState<Date | undefined>(undefined);

	return (
		<DatePicker
			labels={{
				label: 'Date',
			}}
			isIsoWeekday
			onChange={(event, data) => {
				console.log('onChange', data);
				setValue(data.date);
			}}
			formatter={formatDate}
			parser={parseDate}
			value={value}
		/>
	);
};

export const ISOWeekdays: Story = {
	name: 'ISO Weekdays (Monday First)',
	render: () => <ISOWeekdaysComponent />,
};

// Right to Left
const RTLComponent = () => {
	const [value, setValue] = useState<Date | undefined>(undefined);

	return (
		<UNSAFE_DirectionSettings.Provider value="rtl">
			<div dir="rtl">
				<DatePicker
					labels={{
						label: 'Date',
					}}
					onChange={(event, data) => {
						console.log('onChange', data);
						setValue(data.date);
					}}
					formatter={formatDate}
					parser={parseDate}
					value={value}
				/>
			</div>
		</UNSAFE_DirectionSettings.Provider>
	);
};

export const RightToLeft: Story = {
	name: 'Right to Left (RTL)',
	render: () => <RTLComponent />,
};

// Inline menu (relative position)
const InlineMenuComponent = () => {
	return (
		<DatePicker
			labels={{
				label: 'Date',
			}}
			menuPosition="relative"
			formatter={formatDate}
			parser={parseDate}
		/>
	);
};

export const InlineMenu: Story = {
	render: () => <InlineMenuComponent />,
};

// Error state
const ErrorComponent = () => {
	const [value, setValue] = useState<Date | undefined>(undefined);

	return (
		<DatePicker
			labels={{
				label: 'Date',
			}}
			hasError
			onChange={(event, data) => {
				console.log('onChange', data);
				setValue(data.date);
			}}
			formatter={formatDate}
			parser={parseDate}
			value={value}
		/>
	);
};

export const Error: Story = {
	name: 'Error State',
	render: () => <ErrorComponent />,
};

// Disabled dates
const DisabledDatesComponent = () => {
	const [value, setValue] = useState<Date | undefined>(undefined);

	// Disable weekends
	const dateDisabled = (date: Date) => {
		const day = date.getDay();
		return day === 0 || day === 6;
	};

	return (
		<DatePicker
			labels={{
				label: 'Date (Weekends Disabled)',
			}}
			dateDisabled={dateDisabled}
			onChange={(event, data) => {
				console.log('onChange', data);
				setValue(data.date);
			}}
			formatter={formatDate}
			parser={parseDate}
			value={value}
		/>
	);
};

export const DisabledDates: Story = {
	name: 'Disabled Dates (Weekends)',
	render: () => <DisabledDatesComponent />,
};

// Custom year range
const CustomYearRangeComponent = () => {
	const [value, setValue] = useState<Date | undefined>(undefined);

	return (
		<DatePicker
			labels={{
				label: 'Date',
			}}
			relativeYearFrom={-50}
			relativeYearTo={50}
			onChange={(event, data) => {
				console.log('onChange', data);
				setValue(data.date);
			}}
			formatter={formatDate}
			parser={parseDate}
			value={value}
		/>
	);
};

export const CustomYearRange: Story = {
	name: 'Custom Year Range (+/- 50 years)',
	render: () => <CustomYearRangeComponent />,
};

// Right aligned
const RightAlignedComponent = () => {
	const [value, setValue] = useState<Date | undefined>(undefined);

	return (
		<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
			<DatePicker
				labels={{
					label: 'Date',
				}}
				align="right"
				onChange={(event, data) => {
					console.log('onChange', data);
					setValue(data.date);
				}}
				formatter={formatDate}
				parser={parseDate}
				value={value}
			/>
		</div>
	);
};

export const RightAligned: Story = {
	render: () => <RightAlignedComponent />,
};

// Disabled
const DisabledComponent = () => {
	return (
		<DatePicker
			labels={{
				label: 'Date (Disabled)',
			}}
			disabled
			formatter={formatDate}
			parser={parseDate}
		/>
	);
};

export const Disabled: Story = {
	render: () => <DisabledComponent />,
};

// Preselected Date
const PreselectedComponent = () => {
	const [value, setValue] = useState<Date>(new Date(2024, 11, 25)); // December 25, 2024

	return (
		<DatePicker
			labels={{
				label: 'Date (Preselected)',
			}}
			onChange={(event, data) => {
				console.log('onChange', data);
				setValue(data.date);
			}}
			formatter={formatDate}
			parser={parseDate}
			value={value}
		/>
	);
};

export const PreselectedDate: Story = {
	render: () => <PreselectedComponent />,
};

// Custom Internationalization
const InternationalizedComponent = () => {
	const [value, setValue] = useState<Date | undefined>(undefined);

	return (
		<DatePicker
			labels={{
				label: 'Fecha',
				placeholder: 'Selecciona una fecha',
				today: 'Hoy',
				abbreviatedWeekDays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
				weekDays: [
					'Domingo',
					'Lunes',
					'Martes',
					'Miércoles',
					'Jueves',
					'Viernes',
					'Sábado',
				],
				months: [
					'Enero',
					'Febrero',
					'Marzo',
					'Abril',
					'Mayo',
					'Junio',
					'Julio',
					'Agosto',
					'Septiembre',
					'Octubre',
					'Noviembre',
					'Diciembre',
				],
			}}
			assistiveText={{
				nextMonth: 'Mes siguiente',
				previousMonth: 'Mes anterior',
				openCalendar: 'Abrir calendario',
				year: 'Año',
			}}
			onChange={(event, data) => {
				console.log('onChange', data);
				setValue(data.date);
			}}
			formatter={formatDateEuropean}
			parser={(dateString) => {
				const parts = dateString.split(/[/-]/);
				if (parts.length === 3) {
					const day = parseInt(parts[0], 10);
					const month = parseInt(parts[1], 10) - 1;
					const year = parseInt(parts[2], 10);
					return new Date(year, month, day);
				}
				return new Date(dateString);
			}}
			value={value}
		/>
	);
};

export const Internationalized: Story = {
	name: 'Internationalized (Spanish)',
	render: () => <InternationalizedComponent />,
};
