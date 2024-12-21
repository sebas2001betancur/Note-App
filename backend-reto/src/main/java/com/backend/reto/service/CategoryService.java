package com.backend.reto.service;

import com.backend.reto.exception.ResourceNotFoundException;
import com.backend.reto.model.Category;
import com.backend.reto.repository.CategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
    }

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public void delete(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        // Verificar si la categoría tiene notas asociadas
        if (!category.getNotes().isEmpty()) {
            throw new IllegalStateException("No se puede eliminar una categoría que tiene notas asociadas");
        }

        categoryRepository.deleteById(id);
    }
}
