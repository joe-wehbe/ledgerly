import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { DatePipe, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddNoteComponent } from '../../components/general/add-note/add-note.component';
import { SnackbarService } from '../../services/utility/snackbar.service';

@Component({
  selector: 'app-notes-page',
  imports: [AddNoteComponent, DatePipe, SlicePipe, FormsModule],
  templateUrl: './notes-page.component.html',
  styleUrl: './notes-page.component.css'
})
export class NotesPageComponent implements OnInit{
  isLoading = true;
  notes: Note[] = [];
  searchQuery: string = '';
  isModalOpen = false;
  addNoteModalOpen = false;
  selectedNote: Note | null = null;
  newest = true;
  title: string = '';
  note: string = '';

  constructor (private notesService: NotesService, private snackBarService: SnackbarService) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);

    this.notes = this.notesService.getNotes();
  }

  filteredNotes() {
    return this.notes.filter(note => {
      const query = this.searchQuery.toLowerCase().trim();
      const dateObj = new Date(note.date);
      const dateStr = note.date instanceof Date ? note.date.toISOString().split('T')[0] : note.date;  
      const fullMonthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(dateObj).toLowerCase();
      const shortMonthFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(dateObj).toLowerCase();
  
      return (
        note.title.toLowerCase().includes(query) ||
        note.note.toLowerCase().includes(query) ||
        dateStr.includes(query) ||
        fullMonthFormat.includes(query) ||
        shortMonthFormat.includes(query)
      );
    }).sort((a, b) => this.newest ? new Date(b.date).getTime() - new Date(a.date).getTime() : new Date(a.date).getTime() - new Date(b.date).getTime());
  } 

  sortByDate() {
    this.newest = !this.newest;
  }

  openModal(note: Note) {
    this.isModalOpen = true;
    this.selectedNote = note;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  deleteNote(id: number | undefined) {
    this.snackBarService.confirm('Are you sure you want to delete this note?', 'Delete')
    .subscribe(() => {
      this.notesService.deleteNote(id);
      this.closeModal();
      this.notes = this.notes.filter(note => note.id !== id);
    });
  }

  openAddNoteModal() {
    this.addNoteModalOpen = true;
  }

  closeAddNoteModal() {
    this.addNoteModalOpen = false;
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.notesService.addNote(this.title, this.note);
      this.notes = this.notesService.getNotes(); 
      this.snackBarService.success("Note added");
      form.reset();
      this.closeAddNoteModal();
    }
    else {
      this.snackBarService.warning("Invalid input");
    }
  }

  cancelQuery() {
    this.searchQuery = '';
  }
}