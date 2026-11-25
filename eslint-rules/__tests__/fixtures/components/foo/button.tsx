import type { FooProps } from '.';

const Inner = (props: FooProps) => <span>{props.label}</span>;

// A component passing its own deprecated prop on: allowed.
export const FooButton = (props: FooProps) => <Inner text={props.text} />;
