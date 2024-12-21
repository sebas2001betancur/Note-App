import { useCallback, useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { getAllCategories } from "./services/categoryService";
import { getArchivedNotes, getNotes, getNotesByCategory } from "./services/noteService";
import CategoryList from "./components/CategoryList";
import Header from "./components/Header";

//App.js
function App() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Obtener solo las categorías
      const categoriesResponse = await getAllCategories(); // Cambiado de getCategoryById
      setCategories(categoriesResponse.data);

      // Obtener las notas según el filtro
      let notesResponse;
      if (selectedCategory) {
        notesResponse = await getNotesByCategory(selectedCategory);
      } else {
        notesResponse = await (showArchived ? getArchivedNotes() : getNotes());
      }
      setNotes(notesResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [showArchived, selectedCategory]); // Solo estas dependencias son necesarias

  // Cargar datos cuando cambien los filtros
  useEffect(() => {
    loadData();
  }, [loadData]); // Solo depende de loadData

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setIsAddingNote(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Note
          </button>
          <button
            onClick={() => setShowArchived(!showArchived)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            {showArchived ? 'Show Active' : 'Show Archived'}
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <CategoryList
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onCategoryChange={loadData}
              />
            </div>
            <div className="md:col-span-3">
              <NoteList
                notes={notes}
                onNotesChange={loadData}
                categories={categories}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>
        )}

        {isAddingNote && (
          <NoteForm
            onClose={() => setIsAddingNote(false)}
            onSave={loadData}
            categories={categories}
          />
        )}
      </main>
    </div>
  );
}

export default App;