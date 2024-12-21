import api from './api';

export const getNotes = () => api.get('/notes');
export const getArchivedNotes = () => api.get('/notes/archived');
export const createNote = (note) => api.post('/notes', note);
export const updateNote = (id, note) => api.put(`/notes/${id}`, note);
export const deleteNote = (id) => api.delete(`/notes/${id}`);
export const archiveNote = (id) => api.put(`/notes/${id}/archive`);
export const addCategoryToNote = (noteId, categoryId) => 
  api.put(`/notes/${noteId}/categories/${categoryId}`);
export const removeCategoryFromNote = (noteId, categoryId) => 
  api.delete(`/notes/${noteId}/categories/${categoryId}`);
export const getNotesByCategory = (categoryId) => 
  api.get(`/notes/category/${categoryId}`);