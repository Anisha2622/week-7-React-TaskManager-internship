import React, { useState } from 'react';
import { Trash2, Edit2, X, Check, CheckCircle2, Circle, AlertCircle, Calendar } from 'lucide-react';

const PRIORITY_STYLES = {
  High: 'text-rose-600 bg-rose-50 border-rose-200',
  Medium: 'text-amber-600 bg-amber-50 border-amber-200',
  Low: 'text-sky-600 bg-sky-50 border-sky-200'
};

const CATEGORY_COLORS = {
  Work: 'bg-indigo-500', Personal: 'bg-emerald-500', Health: 'bg-rose-500', Shopping: 'bg-amber-500', Home: 'bg-cyan-500'
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, { text: editText.trim() });
      setIsEditing(false);
    }
  };

  return (
    <div className={`group flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 ${task.completed ? 'bg-slate-50 border-slate-200/60 opacity-60' : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-0.5'}`}>
      <button onClick={() => onToggle(task.id)} className="mt-1 flex-shrink-0 text-slate-300 hover:text-blue-500 transition-colors">
        {task.completed ? <CheckCircle2 size={26} className="text-emerald-500" /> : <Circle size={26} />}
      </button>

      <div className="flex-grow min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2 mb-3">
            <input type="text" autoFocus value={editText} onChange={(e) => setEditText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSave()} className="w-full bg-white border-2 border-blue-500 text-slate-800 rounded-lg px-3 py-1.5 focus:outline-none font-medium" />
            <button onClick={handleSave} className="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg"><Check size={20} /></button>
            <button onClick={() => setIsEditing(false)} className="text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg"><X size={20} /></button>
          </div>
        ) : (
          <p className={`text-lg mb-3 break-words font-medium transition-all ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
            {task.text}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
          <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${PRIORITY_STYLES[task.priority]}`}>
            <AlertCircle size={14} /> {task.priority}
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
            <div className={`w-2.5 h-2.5 rounded-full shadow-sm ${CATEGORY_COLORS[task.category]}`}></div>
            {task.category}
          </span>
          <span className="flex items-center gap-1.5 text-slate-400 ml-auto bg-slate-50 px-2 py-1 rounded-lg">
            <Calendar size={14} />
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        {!isEditing && !task.completed && (
          <button onClick={() => setIsEditing(true)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"><Edit2 size={18} /></button>
        )}
        <button onClick={() => onDelete(task.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 size={18} /></button>
      </div>
    </div>
  );
}
