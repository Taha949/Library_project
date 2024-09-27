import { Component } from '@angular/core';
import { MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogTitle,
  ],
  template: `
    <h1 mat-dialog-title>Ajouter un nouveau livre</h1>
    <form [formGroup]="bookForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Titre</mat-label>
        <input matInput formControlName="title">
      </mat-form-field>

      <mat-form-field>
        <mat-label>Auteur</mat-label>
        <input matInput formControlName="author">
      </mat-form-field>

      <mat-form-field>
        <mat-label>Nombre de pages</mat-label>
        <input matInput type="number" formControlName="pages">
      </mat-form-field>

      <mat-form-field>
        <mat-label>Année de publication</mat-label>
        <input matInput type="number" formControlName="publicationYear"> <!-- Harmonisé ici -->
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit">Ajouter</button>
    </form>
  `,
})
export class BookDialogComponent {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookDialogComponent>
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      pages: [0, [Validators.required, Validators.min(1)]],
      publicationYear: [new Date().getFullYear(), [Validators.required, Validators.min(0)]]  // Harmonisé ici
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.dialogRef.close(this.bookForm.value);
    }
  }
}
