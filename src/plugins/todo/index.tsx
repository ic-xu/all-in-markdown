import React from 'react';
import { ListTodo } from 'lucide-react';

import type { Plugin } from '@/types/plugin';
import { TodoList } from './TodoList';
import { TodoSettings } from './TodoSettings';
import { extractTodos } from './todoUtils';

export const todoPlugin: Plugin = {
  id: 'todo',
  name: 'Todo List',
  version: '1.0.0',
  description: 'Extract and manage todo items with assignees',
  defaultSettings: {
    showCompleted: true,
    sortBy: 'date',
  },
  settingsComponent: TodoSettings,

  async onActivate(context) {
    context.registerToolbarItem({
      id: 'insert-todo',
      position: 'main',
      render: () => (
        <button
          onClick={() => {
            const template = '- [ ] New task; ' + new Date().toISOString().slice(0, 19).replace('T', ' ') + ' @someone';
            context.eventBus.emit('editor:insert', template);
          }}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title="Insert Todo Item"
        >
          <ListTodo className="w-5 h-5" />
        </button>
      ),
    });

    context.registerRenderer({
      id: 'todo-list',
      name: 'Todo List Renderer',
      test: (node) => node.type === 'list' && node.children.some(child =>
        child.type === 'listItem' && child.children[0]?.value?.includes('[ ]')
      ),
      render: (node, children) => {
        const todos = extractTodos(node);
        return <TodoList todos={todos} settings={context.getSettings()} />;
      },
    });
  },
};