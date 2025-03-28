import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../../services/notes.service';

@Component({
  selector: 'app-add-note',
  imports: [FormsModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})
export class AddNoteComponent {
  title: string = '';
  note: string = '';

  constructor (private notesService: NotesService) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.notesService.addNote(this.title, this.note);
      form.reset();
    }
  }
}
