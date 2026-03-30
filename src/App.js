import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { ListTodo, CheckCircle2 } from 'lucide-react';
import './App.css'; 

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('react-task-manager-pro');
    if (savedTasks) {
      try { setTasks(JSON.parse(savedTasks)); } 
      catch (e) { console.error(e); }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) localStorage.setItem('react-task-manager-pro', JSON.stringify(tasks));
  }, [tasks, isLoaded]);

  const addTask = (taskData) => {
    setTasks([{ id: crypto.randomUUID(), ...taskData, completed: false, createdAt: new Date().toISOString() }, ...tasks]);
  };

  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const editTask = (id, updatedData) => setTasks(tasks.map(t => t.id === id ? { ...t, ...updatedData } : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  const clearCompleted = () => setTasks(tasks.filter(t => !t.completed));

  const activeCount = tasks.filter(t => !t.completed).length;

  if (!isLoaded) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-medium">Loading workspace...</div>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        <header className="mb-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-slate-200 mb-6 text-blue-600">
            <ListTodo size={36} strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Task Workspace</h1>
        </header>

        <TaskInput onAdd={addTask} />

        {tasks.length > 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex bg-slate-200/50 rounded-xl p-1.5 border border-slate-200">
                {['All', 'Active', 'Completed'].map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${filter === f ? 'bg-white text-blue-700 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
                <span>Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-white border border-slate-200 text-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm">
                  <option value="Newest">Newest First</option>
                  <option value="Oldest">Oldest First</option>
                  <option value="Priority">Highest Priority</option>
                </select>
              </div>
            </div>

            <TaskList tasks={tasks} filter={filter} sortBy={sortBy} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />

            <div className="bg-slate-50 p-5 sm:px-8 flex justify-between items-center text-sm font-semibold text-slate-500 border-t border-slate-200">
              <span className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200">
                <span className="text-blue-600 font-bold">{activeCount}</span> tasks remaining
              </span>
              {tasks.some(t => t.completed) && (
                <button onClick={clearCompleted} className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg">
                  Clear Completed
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-24 px-6 border-2 border-dashed border-slate-300 rounded-3xl bg-white shadow-sm">
            <div className="bg-emerald-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} className="text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-3">You're all caught up!</h3>
          </div>
        )}
      </div>
    </div>
  );
}
