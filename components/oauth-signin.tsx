'use client';

import { Provider } from '@supabase/supabase-js';
import { Github } from 'lucide-react';
import { Fragment, JSX } from 'react';
import { Button } from './ui/button';
import { oAuthSignIn } from '@/app/login/actions';

type OAuthProvider = {
	name: Provider;
	displayName: string;
	icon?: JSX.Element;
};

export default function OAuthButtons() {
	// DATA INIT
	const oAuthProviders: OAuthProvider[] = [
		{
			name: 'github',
			displayName: 'GitHub',
			icon: <Github className='size-5' />,
		},
	];

	return (
		<Fragment>
			{oAuthProviders.map((provider, index) => (
				<Button
					onClick={async (e) => {
						e.preventDefault();
						await oAuthSignIn(provider.name);
					}}
					key={index}
					className='flex items-center justify-center gap-2'
					variant='outline'>
					{provider.icon}
					Login with {provider.displayName}
				</Button>
			))}
		</Fragment>
	);
}
