/**
 * Type definitions for Filter component
 */

export interface FilterAssistiveText {
	/** Assistive text for editing a filter */
	editFilter?: string;
	/** Assistive text for the popover heading */
	editFilterHeading?: string;
	/** Assistive text for removing a filter */
	removeFilter?: string;
}

export interface FilterChangeData {
	id: string;
}

export type FilterChangeHandler = (
	event: React.MouseEvent<HTMLButtonElement>,
	data: FilterChangeData
) => void;

export type FilterRemoveHandler = (
	event: React.MouseEvent<HTMLButtonElement>,
	data: FilterChangeData
) => void;



