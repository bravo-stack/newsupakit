'use client';

import { deleteTodo, updateTodo } from '@/app/todos/actions';
import { cn } from '@/lib/utils';
import { Todo } from '@/types/custom';
import { Trash2 } from 'lucide-react';
import { startTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { TodoOptimisticUpdate } from './todoslist';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';

type Props = {
	todo: Todo;
	optimisticUpdate: TodoOptimisticUpdate;
};

export function TodoItem({ todo, optimisticUpdate }: Props) {
	return (
		<form>
			<TodoCard
				optimisticUpdate={optimisticUpdate}
				todo={todo}
			/>
		</form>
	);
}

function TodoCard({ todo, optimisticUpdate }: Props) {
	const { pending } = useFormStatus();

	return (
		<Card className={cn('w-full', pending && 'opacity-50')}>
			<CardContent className='flex items-start gap-3 p-3'>
				<span className='size-10 flex items-center justify-center'>
					<Checkbox
						disabled={pending}
						checked={Boolean(todo.is_complete)}
						onCheckedChange={async (value) => {
							if (value === 'indeterminate') return;
							if (todo.id === -1) return;
							startTransition(() => {
								optimisticUpdate({
									action: 'update',
									todo: { ...todo, is_complete: value as boolean },
								});
							});
							await updateTodo({ ...todo, is_complete: value as boolean });
						}}
					/>
				</span>

				<p className={cn('flex-1 pt-2 min-w-0 break-words')}>{todo.task}</p>
				<Button
					disabled={pending}
					formAction={async () => {
						if (todo.id === -1) return;
						optimisticUpdate({ action: 'delete', todo });
						await deleteTodo(todo.id);
					}}
					className='disabled:opacity-50'
					variant='ghost'
					size='icon'>
					<Trash2 className='size-5' />
					<span className='sr-only'>Delete Todo</span>
				</Button>
			</CardContent>
		</Card>
	);
}
