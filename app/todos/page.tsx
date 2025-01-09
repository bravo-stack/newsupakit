import { TodoList } from '@/components/todoslist';
import { Separator } from '@/components/ui/separator';
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

	const { data: todos } = await supabase
		.from('todos')
		.select()
		.order('inserted_at', { ascending: false });

	return (
		<main className='w-full flex-1 flex flex-col gap-6 lg:max-w-2xl'>
			<section className='lg:p-3 pt-6 flex flex-col gap-4 w-full'>
				<h1 className='text-4xl scroll-m-20 font-extrabold tracking-tight'>
					SupaKit Todos
				</h1>
				<Separator />
				<TodoList todos={todos ?? []} />
			</section>
		</main>
	);
}
