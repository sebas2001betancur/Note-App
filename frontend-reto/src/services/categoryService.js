import api from './api';

export const getAllCategories = () => api.get('/categories');
export const getCategoryById = (id) => api.get(`/categories/${id}`);
export const createCategory = (category) => api.post('/categories', category);
export const deleteCategory = async (id) => {
    try {
      const response = await api.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 500) {
        throw new Error('No se puede eliminar una categoría que tiene notas asociadas');
      }
      throw error;
    }
  };
