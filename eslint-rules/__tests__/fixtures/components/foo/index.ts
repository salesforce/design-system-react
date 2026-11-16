export interface FooProps {
	/** @deprecated Use `label` instead. */
	text?: string;
	label?: string;
}

// A component honoring its own deprecated prop: allowed.
export const foo = (props: FooProps) => props.label ?? props.text;
