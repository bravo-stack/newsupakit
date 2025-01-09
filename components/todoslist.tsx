import { Todo } from '@/types/custom';
import { Fragment } from 'react';
import { TodoForm } from './todo-form';
import { TodoItem } from './todo-item';

type Props = {
	todos: Array<Todo>;
};

export function TodoList({ todos }: Props) {
	return (
		<Fragment>
			{/* Todo Form */}
			<TodoForm />
			<div className='w-full flex flex-col gap-4'>
				{todos?.map((todo, index) => (
					<TodoItem
						key={index}
						todo={todo}
					/>
				))}
			</div>
		</Fragment>
	);
}
