package com.backend.reto.controller;


import com.backend.reto.model.Note;
import com.backend.reto.service.CategoryService;
import com.backend.reto.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:3000")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Note> getAllActiveNotes() {
        return noteService.findAllActiveNotes();
    }

    @GetMapping("/archived")
    public List<Note> getAllArchivedNotes() {
        return noteService.findAllArchivedNotes();
    }

    @GetMapping("/category/{categoryId}")
    public List<Note> getNotesByCategory(@PathVariable Long categoryId) {
        return noteService.findByCategory(categoryId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        Note note = noteService.findById(id);
        return ResponseEntity.ok(note);
    }

    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        try {
            System.out.println("Received note: " + note); // Log la nota recibida
            Note savedNote = noteService.save(note);
            return ResponseEntity.ok(savedNote);
        } catch (Exception e) {
            e.printStackTrace(); // Log cualquier error
            throw e;
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note noteDetails) {
        Note updatedNote = noteService.update(id, noteDetails);
        return ResponseEntity.ok(updatedNote);
    }

    @PutMapping("/{id}/archive")
    public ResponseEntity<Note> toggleArchiveStatus(@PathVariable Long id) {
        Note archivedNote = noteService.toggleArchive(id);
        return ResponseEntity.ok(archivedNote);
    }

    @PutMapping("/{noteId}/categories/{categoryId}")
    public ResponseEntity<Note> addCategoryToNote(
            @PathVariable Long noteId,
            @PathVariable Long categoryId) {
        Note note = noteService.addCategory(noteId, categoryService.findById(categoryId));
        return ResponseEntity.ok(note);
    }

    @DeleteMapping("/{noteId}/categories/{categoryId}")
    public ResponseEntity<Note> removeCategoryFromNote(
            @PathVariable Long noteId,
            @PathVariable Long categoryId) {
        Note note = noteService.removeCategory(noteId, categoryId);
        return ResponseEntity.ok(note);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id) {
        noteService.delete(id);
        return ResponseEntity.ok().build();
    }
}
