import React from 'react';
import TaskItem from './TaskItem';
import { LayoutList } from 'lucide-react';

export default function TaskList({ tasks, filter, sortBy, onToggle, onDelete, onEdit }) {
  const processedTasks = tasks
    .filter(task => {
      if (filter === 'Active') return !task.completed;
      if (filter === 'Completed') return task.completed;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'Newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'Oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'Priority') {
        const weight = { High: 3, Medium: 2, Low: 1 };
        return weight[b.priority] - weight[a.priority];
      }
      return 0;
    });

  if (processedTasks.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-300 m-2">
        <LayoutList size={48} className="mx-auto mb-4 text-slate-300" />
        <p className="text-lg font-medium text-slate-500">No tasks found in this view.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-3 bg-slate-50/30">
      {processedTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
