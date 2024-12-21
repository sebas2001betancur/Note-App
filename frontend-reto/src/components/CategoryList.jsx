import { Plus, Trash2 } from "lucide-react";
import { createCategory, deleteCategory } from "../services/categoryService";
import { useState } from "react";

//categoryList.jsx
export function CategoryList({ categories, selectedCategory, onSelectCategory, onCategoryChange }) {
    const [newCategory, setNewCategory] = useState('');
  
    const handleCreateCategory = async (e) => {
      e.preventDefault();
      if (!newCategory.trim()) return;
  
      try {
        await createCategory({ name: newCategory });
        setNewCategory('');
        onCategoryChange();
      } catch (error) {
        console.error('Error creating category:', error);
      }
    };
  
    const handleDeleteCategory = async (id) => {
      try {
        await deleteCategory(id);
        onCategoryChange();
        if (selectedCategory === id) {
          onSelectCategory(null);
        }
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    };
  
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4 h-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
        
        <form onSubmit={handleCreateCategory} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category"
              className="flex-1 px-3 py-2 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            />
            <button
              type="submit"
              className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          </div>
        </form>
  
        <div className="space-y-1">
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
              !selectedCategory 
                ? 'bg-blue-50 text-blue-700 font-medium' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Notes
          </button>
          
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center group"
            >
              <button
                onClick={() => onSelectCategory(category.id)}
                className={`flex-1 text-left px-4 py-2 rounded-md transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="hidden group-hover:flex items-center justify-center w-8 h-8 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

    export default CategoryList;
