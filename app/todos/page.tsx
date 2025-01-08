import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Todos() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect('/login');
	}

	return (
		<main className='w-full flex-1 flex flex-col gap-6 px-4'>
			<h2 className='font-medium text-2xl mb-4'>{`Hi, Welcome`}</h2>
		</main>
	);
}
