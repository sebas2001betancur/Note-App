// NoteForm.jsx
import React, { useEffect, useState } from 'react';
import { createNote, updateNote } from '../services/noteService';

function NoteForm({ onClose, onSave, categories = [], initialNote = null }) {
  const [note, setNote] = useState({
    title: '',
    content: '',
    categories: []
  });

  useEffect(() => {
    if (initialNote) {
      setNote({
        ...initialNote,
        categories: initialNote.categories?.map(cat => cat.id) || []
      });
    }
  }, [initialNote]);

  const toggleCategory = (categoryId) => {
    setNote(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const noteToSend = {
        ...note,
        categories: (note.categories || []).map(categoryId => ({
          id: categoryId
        }))
      };

      if (initialNote) {
        await updateNote(initialNote.id, noteToSend);
      } else {
        await createNote(noteToSend);
      }
      
      onSave?.();
      onClose?.();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {initialNote ? 'Edit Note' : 'Create New Note'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={note.title || ''}
              onChange={e => setNote({...note, title: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={note.content || ''}
              onChange={e => setNote({...note, content: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Categories</label>
            <div className="mt-2 space-y-2">
              {categories.map(category => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={(note.categories || []).includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="ml-2">{category.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {initialNote ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;