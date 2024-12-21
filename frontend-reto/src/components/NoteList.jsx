import { useEffect, useState } from "react";
import { deleteNote, getNotesByCategory } from "../services/noteService";
import NoteForm from "./NoteForm";

//NoteList.jsx
export default function NoteList({ 
  notes = [], 
  onNotesChange, 
  categories = [], 
  selectedCategory // Nuevo prop para la categoría seleccionada
}) {
  const [editingNote, setEditingNote] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState(notes);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        if (selectedCategory) {
          // Cargar notas específicas de la categoría
          const response = await getNotesByCategory(selectedCategory);
          setFilteredNotes(response.data);
        } else {
          setFilteredNotes(notes);
        }
      } catch (error) {
        console.error('Error loading notes:', error);
        setFilteredNotes([]);
      }
    };

    loadNotes();
  }, [selectedCategory, notes]);



  const handleDelete = async (noteId) => {
    if (window.confirm('Esta seguro que quiere eliminar la nota?')) {
      try {
        await deleteNote(noteId);
        onNotesChange?.();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  if (!Array.isArray(notes)) {
    return <div>No notes available</div>;
  }


  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {filteredNotes.map(note => (
        <div key={note?.id || Math.random()} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{note?.title}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingNote(note)}
                className="text-blue-600 hover:text-blue-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(note?.id)}
                className="text-red-600 hover:text-red-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-3">{note?.content}</p>
          
          {note?.categories?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {note.categories.map(category => (
                <span
                  key={category?.id || Math.random()}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {category?.name}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}

      {editingNote && (
        <NoteForm
          initialNote={editingNote}
          categories={categories}
          onClose={() => setEditingNote(null)}
          onSave={onNotesChange}
        />
      )}
    </div>
  );
}