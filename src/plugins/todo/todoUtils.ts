import { TodoItem } from './types';

export function extractTodos(node: any): TodoItem[] {
  const todos: TodoItem[] = [];

  function processListItem(item: any) {
    if (item.type !== 'listItem') return;
    
    const text = item.children[0]?.value || '';
    if (!text.includes('[ ]') && !text.includes('[x]')) return;

    const completed = text.includes('[x]');
    const parts = text.split(';');
    
    if (parts.length < 1) return;

    const taskText = parts[0].replace(/^\s*-\s*\[[x\s]?\]\s*/, '').trim();
    let date: Date | undefined;
    let assignee: string | undefined;

    if (parts[1]) {
      const metadata = parts[1].trim();
      
      // Extract date
      const dateMatch = metadata.match(/\d{4}-\d{2}-\d{2}\s+\d{2}-\d{2}-\d{2}/);
      if (dateMatch) {
        const dateStr = dateMatch[0].replace(/-/g, ':');
        date = new Date(dateStr);
      }

      // Extract assignee
      const assigneeMatch = metadata.match(/@(\S+)/);
      if (assigneeMatch) {
        assignee = assigneeMatch[1];
      }
    }

    todos.push({
      text: taskText,
      completed,
      date,
      assignee,
    });
  }

  function traverse(node: any) {
    if (Array.isArray(node.children)) {
      node.children.forEach((child: any) => {
        if (child.type === 'listItem') {
          processListItem(child);
        }
        traverse(child);
      });
    }
  }

  traverse(node);
  return todos;
}