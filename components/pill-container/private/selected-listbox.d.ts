declare module '@salesforce/design-system-react/components/pill-container/private/selected-listbox' {
	import React from 'react';
	type Props = {
		/*
		 * The option object within the selection prop that should have focus.
		 */
		activeOption?: Record<string, any>;
		/*
		 * The index of the option object within the selection prop that should have focus.
		 */
		activeOptionIndex?: number;
		/**
		 * **Assistive text for accessibility**
		 * This object is merged with the default props object on every render.
		 * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
		 * * `removePill`: Aids in keyboard interaction with Pills.
		 * * `selectedListboxLabel`: Used to identify the listbox
		 */
		assistiveText?: Partial<{
			label?: string;
			removePill?: string;
			selectedListboxLabel?: string;
		}>;
		/**
		 * CSS classes to be added to the top-level `div` tag.
		 */
		className?: any[] | Record<string, any> | string;
		/*
		 * Callbacks for various pill events such as click, focus, etc
		 */
		events?: Partial<{
			onClickPill: (v: any) => any /*.isRequired*/;
			onPillFocus: (v: any) => any /*.isRequired*/;
			onRequestFocus: (v: any) => any /*.isRequired*/;
			onRequestFocusOnNextPill: (v: any) => any /*.isRequired*/;
			onRequestFocusOnPreviousPill: (v: any) => any /*.isRequired*/;
			onRequestRemove: (v: any) => any /*.isRequired*/;
		}>;
		/**
		 * HTML id for component main container
		 */
		id?: string;
		/**
		 * Determines whether component renders as a bare pill container with associated styling for child pills
		 */
		isBare?: boolean;
		/**
		 * Adds inline (inside of input) styling
		 */
		isInline?: boolean;
		/**
		 * Determines whether component renders as a pill container with associated styling and behavior
		 */
		isPillContainer?: boolean;
		/*
		 * Pill Label
		 */
		labels?: Partial<{
			label?: string;
			remove?: string;
			title?: string;
		}>;
		/**
		 * Changes styles of the input. Currently `entity` is not supported.
		 */
		renderAtSelectionLength?: number;
		/**
		 * This callback exposes the selected listbox reference / DOM node to parent components.
		 */
		selectedListboxRef?: (v: any) => any;
		/**
		 * Accepts an array of item objects.
		 */
		selection?: any[];
		/**
		 * Custom styles to be passed to the top-level `div` tag
		 */
		style?: Record<string, any>;
		/**
		 * Requests that the active option set focus on render
		 */
		listboxHasFocus?: boolean;
		/**
		 * Changes styles of the input. Currently `entity` is not supported.
		 */
		variant?: 'base' | 'inline-listbox' | 'readonly';
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
