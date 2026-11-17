import { FooButton } from '../foo/button';

// Another component's deprecated prop as a JSX attribute: an error.
export const BarButton = () => <FooButton text="Hi" />;
