import { signOutAction } from '@/app/actions';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { ThemeSwitcher } from './theme-switcher';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export default async function AuthButton() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!hasEnvVars) {
		return (
			<>
				<div className='flex gap-4 items-center'>
					<div>
						<Badge
							variant={'default'}
							className='font-normal pointer-events-none'>
							Please update .env.local file with anon key and url
						</Badge>
					</div>
					<div className='flex gap-2'>
						<Button
							asChild
							size='sm'
							variant={'outline'}
							disabled
							className='opacity-75 cursor-none pointer-events-none'>
							<Link href='/login'>Sign in</Link>
						</Button>
						<Button
							asChild
							size='sm'
							variant={'default'}
							disabled
							className='opacity-75 cursor-none pointer-events-none'>
							<Link href='/create-account'>Sign up</Link>
						</Button>
					</div>
				</div>
			</>
		);
	}
	return user ? (
		<div className='flex items-center gap-2 lg:gap-4'>
			<span className='hidden lg:inline'>{user.email}</span>
			<form action={signOutAction}>
				<Button
					type='submit'
					variant={'outline'}>
					Sign out
				</Button>
			</form>
			<div className='w-fit h-full flex items-center'>
				<ThemeSwitcher />
			</div>
		</div>
	) : (
		<div className='flex gap-2'>
			<Button
				asChild
				size='sm'
				variant={'outline'}>
				<Link href='/login'>Sign in</Link>
			</Button>
			<Button
				asChild
				size='sm'
				variant={'default'}>
				<Link href='/create-account'>Sign up</Link>
			</Button>
			<div className='h-full flex items-center'>
				<ThemeSwitcher />
			</div>
		</div>
	);
}
