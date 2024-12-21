package com.backend.reto.service;

import com.backend.reto.exception.ResourceNotFoundException;
import com.backend.reto.model.Category;
import com.backend.reto.model.Note;
import com.backend.reto.repository.CategoryRepository;
import com.backend.reto.repository.NoteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class NoteService {
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Note> findAllActiveNotes() {
        return noteRepository.findByArchivedFalseOrderByUpdatedAtDesc();
    }

    public List<Note> findAllArchivedNotes() {
        return noteRepository.findByArchivedTrueOrderByUpdatedAtDesc();
    }

    public List<Note> findByCategory(Long categoryId) {
        return noteRepository.findByCategoriesIdAndArchivedFalse(categoryId);
    }

    public Note findById(Long id) {
        return noteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: " + id));
    }

    public Note save(Note note) {
        // Si la nota viene con IDs de categorías, necesitamos cargar las categorías reales
        if (note.getCategories() != null && !note.getCategories().isEmpty()) {
            Set<Category> categories = new HashSet<>();
            for (Category category : note.getCategories()) {
                categoryRepository.findById(category.getId())
                        .ifPresent(categories::add);
            }
            note.setCategories(categories);
        }
        return noteRepository.save(note);
    }

    public Note update(Long id, Note noteDetails) {
        Note note = findById(id);
        note.setTitle(noteDetails.getTitle());
        note.setContent(noteDetails.getContent());
        return noteRepository.save(note);
    }

    public Note toggleArchive(Long id) {
        Note note = findById(id);
        note.setArchived(!note.isArchived());
        return noteRepository.save(note);
    }

    public Note addCategory(Long noteId, Category category) {
        Note note = findById(noteId);
        note.getCategories().add(category);
        return noteRepository.save(note);
    }

    public Note removeCategory(Long noteId, Long categoryId) {
        Note note = findById(noteId);
        note.setCategories(note.getCategories().stream()
                .filter(category -> !category.getId().equals(categoryId))
                .collect(Collectors.toSet()));
        return noteRepository.save(note);
    }

    public void delete(Long id) {
        noteRepository.deleteById(id);
    }
}
