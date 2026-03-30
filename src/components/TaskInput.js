
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const PRIORITIES = ['Low', 'Medium', 'High'];
const CATEGORIES = ['Work', 'Personal', 'Health', 'Shopping', 'Home'];

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Personal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd({ text: text.trim(), priority, category });
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xl shadow-slate-200/50 mb-8 transition-all">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you need to get done?"
          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
        />
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-3 w-full sm:w-auto">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-600 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium flex-1 sm:flex-none cursor-pointer"
            >
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-600 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium flex-1 sm:flex-none cursor-pointer"
            >
              {PRIORITIES.map(pri => <option key={pri} value={pri}>{pri} Priority</option>)}
            </select>
          </div>
          <button
            type="submit"
            disabled={!text.trim()}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/30 w-full sm:w-auto transition-all"
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}
