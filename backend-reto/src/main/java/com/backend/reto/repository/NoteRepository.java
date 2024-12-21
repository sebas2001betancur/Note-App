package com.backend.reto.repository;

import com.backend.reto.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByArchivedFalseOrderByUpdatedAtDesc();
    List<Note> findByArchivedTrueOrderByUpdatedAtDesc();
    List<Note> findByCategoriesIdAndArchivedFalse(Long categoryId);
}
