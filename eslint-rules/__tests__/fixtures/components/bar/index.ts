import type { FooProps } from '../foo';

// Another component's deprecated prop: an error.
export const bar = (props: FooProps) => props.text;
