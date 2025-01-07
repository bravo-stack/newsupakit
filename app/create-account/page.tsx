import { FormMessage } from '@/components/form-message';
import FormErrorMessage from '@/components/form-error-message';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/submit-button';
import Link from 'next/link';
import { signup } from '../login/actions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function CreateAccountPage(props: {
	searchParams: Promise<{
		message: string;
	}>;
}) {
	// DATA INIT
	const searchParams = await props.searchParams;
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		return redirect('/todos');
	}

	return (
		<form className='flex-1 flex flex-col min-w-64 '>
			<h1 className='text-2xl font-medium'>Create Account</h1>
			<div className='flex flex-col gap-2 [&>input]:mb-3 mt-8'>
				<label htmlFor='email'>Email:</label>
				<Input
					id='email'
					name='email'
					type='email'
					placeholder='Enter your email address'
					required
				/>
			</div>
			<div className='flex flex-col gap-2 [&>input]:mb-3 mt-4'>
				<label htmlFor='password'>Password:</label>
				<Input
					id='password'
					type='password'
					name='password'
					placeholder='Enter your password'
					required
				/>
			</div>
			<FormErrorMessage message={searchParams.message} />

			<div className='flex flex-col gap-4 [&>input]:mb-3 mt-4'>
				<SubmitButton
					pendingText='Signing up...'
					formAction={signup}>
					Sign up
				</SubmitButton>
				<p className='mx-auto text-sm text-foreground'>
					Already have an account?{' '}
					<Link
						className='text-foreground font-medium underline'
						href='/login'>
						Login
					</Link>
				</p>
			</div>
		</form>
	);
}
