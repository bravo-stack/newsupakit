import { cn } from '@/lib/utils';
import { Todo } from '@/types/custom';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';

type Props = {
	todo: Todo;
};

export function TodoItem({ todo }: Props) {
	return (
		<form>
			<TodoCard todo={todo} />
		</form>
	);
}

function TodoCard({ todo }: Props) {
	return (
		<Card className={cn('w-full')}>
			<CardContent className='flex items-start gap-3 p-3'>
				<span className='size-10 flex items-center justify-center'>
					<Checkbox />
				</span>

				<p className={cn('flex-1 pt-2 min-w-0 break-words')}>{todo.task}</p>
				<Button
					variant='ghost'
					size='icon'>
					<Trash2 className='size-5' />
					<span className='sr-only'>Delete Todo</span>
				</Button>
			</CardContent>
		</Card>
	);
}
