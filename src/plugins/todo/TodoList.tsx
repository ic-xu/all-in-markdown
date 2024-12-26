import React from 'react';
import { format } from 'date-fns';
import { TodoItem } from './types';

interface TodoListProps {
  todos: TodoItem[];
  settings: {
    showCompleted: boolean;
    sortBy: 'date' | 'assignee';
  };
}

export function TodoList({ todos, settings }: TodoListProps) {
  const filteredTodos = settings.showCompleted 
    ? todos 
    : todos.filter(todo => !todo.completed);

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (settings.sortBy === 'date') {
      return (a.date?.getTime() || 0) - (b.date?.getTime() || 0);
    } else {
      return (a.assignee || '').localeCompare(b.assignee || '');
    }
  });

  return (
    <div className="space-y-2">
      {sortedTodos.map((todo, index) => (
        <div
          key={index}
          className={`flex items-start gap-2 p-2 rounded ${
            todo.completed ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-700'
          }`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            readOnly
            className="mt-1"
          />
          <div className="flex-1">
            <p className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </p>
            <div className="flex gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
              {todo.date && (
                <span>
                  {format(todo.date, 'yyyy-MM-dd HH:mm:ss')}
                </span>
              )}
              {todo.assignee && (
                <span className="text-blue-500 dark:text-blue-400">
                  @{todo.assignee}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}