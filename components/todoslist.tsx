'use client';
import { Todo } from '@/types/custom';
import { Fragment, useOptimistic } from 'react';
import { TodoForm } from './todo-form';
import { TodoItem } from './todo-item';

type Props = {
	todos: Array<Todo>;
};
type TodoReducerPayload = {
	action: Action;
	todo: Todo;
};

export type Action = 'delete' | 'update' | 'create';

export function todoReducer(
	state: Array<Todo>,
	{ action, todo }: TodoReducerPayload
) {
	switch (action) {
		case 'delete':
			return state.filter(({ id }) => id !== todo.id);
		case 'update':
			return state.map((t) => (t.id === todo.id ? todo : t));
		case 'create':
			return [todo, ...state];
		default:
			return state;
	}
}

export type TodoOptimisticUpdate = (action: TodoReducerPayload) => void;

export function TodoList({ todos }: Props) {
	const [optimisticTodos, optimisticTodosUpdate] = useOptimistic(
		todos,
		todoReducer
	);
	return (
		<Fragment>
			{/* Todo Form */}
			<TodoForm optimisticUpdate={optimisticTodosUpdate} />
			<div className='w-full flex flex-col gap-4'>
				{optimisticTodos?.map((todo, index) => (
					<TodoItem
						optimisticUpdate={optimisticTodosUpdate}
						key={index}
						todo={todo}
					/>
				))}
			</div>
		</Fragment>
	);
}
