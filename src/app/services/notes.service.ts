import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }

  addNote(title: string, note: string) {
    const notes = this.getNotes();
    const id = notes.length > 0 ? Number(notes[notes.length-1].id) + 1 : 1;
    notes.push({id: id, title: title, note: note, date: new Date()});
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  deleteNote(id: number | undefined) {
    const newNotes = this.getNotes().filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(newNotes));
  }

  getNotes(): Note[] {
    return JSON.parse(localStorage.getItem('notes') || '[]');
  }
}
