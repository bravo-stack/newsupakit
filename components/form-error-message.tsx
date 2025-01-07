import { Fragment } from 'react';

type Props = {
	message: string;
};

export default function FormErrorMessage({ message }: Props) {
	return message ? (
		<p className='text-sm font-medium text-destructive'>{message}</p>
	) : (
		<Fragment></Fragment>
	);
}
