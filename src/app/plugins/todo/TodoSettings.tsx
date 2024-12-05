import React from 'react';

interface TodoSettings {
  showCompleted: boolean;
  sortBy: 'date' | 'assignee';
}

export function TodoSettings({ 
  settings, 
  onUpdate 
}: { 
  settings: TodoSettings; 
  onUpdate: (settings: TodoSettings) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="showCompleted"
          checked={settings.showCompleted}
          onChange={(e) => onUpdate({ ...settings, showCompleted: e.target.checked })}
          className="rounded border-gray-300 dark:border-gray-700"
        />
        <label htmlFor="showCompleted" className="text-sm">
          Show completed tasks
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Sort by</label>
        <select
          value={settings.sortBy}
          onChange={(e) => onUpdate({ ...settings, sortBy: e.target.value as 'date' | 'assignee' })}
          className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800"
        >
          <option value="date">Date</option>
          <option value="assignee">Assignee</option>
        </select>
      </div>
    </div>
  );
}