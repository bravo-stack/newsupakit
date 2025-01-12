'use client';
import { addTodo } from '@/app/todos/actions';
import { Todo } from '@/types/custom';
import { Send } from 'lucide-react';
import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { TodoOptimisticUpdate } from './todoslist';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Textarea } from './ui/textarea';

type Props = {
	optimisticUpdate: TodoOptimisticUpdate;
};

export function TodoForm({ optimisticUpdate }: Props) {
	// DATA INIT
	const formRef = useRef<HTMLFormElement>(null);
	return (
		<Card>
			<CardContent className='p-3'>
				<form
					ref={formRef}
					action={async (data) => {
						const newTodo: Todo = {
							id: -1,
							task: data.get('todo') as string,
							is_complete: false,
							inserted_at: '',
							user_id: '',
						};
						optimisticUpdate({ action: 'create', todo: newTodo });
						await addTodo(data);
						formRef?.current?.reset();
					}}
					className='flex gap-4'>
					<FormContent />
				</form>
			</CardContent>
		</Card>
	);
}

function FormContent() {
	const { pending } = useFormStatus();
	return (
		<>
			<Textarea
				className='resize-none'
				disabled={pending}
				minLength={4}
				name='todo'
				required
				placeholder='Add a new todo'
			/>
			<Button
				type='submit'
				size='icon'
				className='min-w-10'
				disabled={pending}>
				<Send className='h-5 w-5' />
				<span className='sr-only'>Submit Todo</span>
			</Button>
		</>
	);
}
