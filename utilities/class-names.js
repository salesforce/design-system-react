// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// eslint-disable-next-line fp/no-rest-parameters
const classNamesWrapper = (...rest) => {
	const string = classNames(...rest);
	return string === '' ? undefined : string;
};

export default classNamesWrapper;
