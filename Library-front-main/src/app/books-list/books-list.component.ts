import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {ApiService, Book} from "../api.service";
import { BookDetailsComponent } from "../book-details/book-details.component";
import { BookDialogComponent } from "../book-dialog/book-dialog.component";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {BookEditDialogComponent} from "../book-edit-dialog/book-edit-dialog.component";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
  standalone: true,
  imports: [FormsModule, MatTableModule, MatDialogModule, MatButtonModule, MatInputModule]
})
export class BooksListComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  searchQuery: string = '';

  displayedColumns: string[] = ['id', 'title', 'author', 'actions'];

  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.apiService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.filteredBooks = data;
      },
      error: (error) => {
        console.error('Erreur lors de la recupertion des livres', error);
      }
    });
  }

  loadBooks(): void {
    this.apiService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des livres', error);
      }
    });
  }

  openEditBookDialog(book: Book): void {
    const dialogRef = this.dialog.open(BookEditDialogComponent, {
      width: '400px',
      data: book
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedBook = { ...book, ...result };
        this.apiService.editBook(updatedBook).subscribe({
          next: (updatedBook) => {
            console.log('Livre mis à jour avec succès:', updatedBook);
            const index = this.books.findIndex(b => b.id === updatedBook.id);
            if (index !== -1) {
              this.books[index] = updatedBook;
            }
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour du livre', error);
          }
        });
      }
    });
  }


  filterBooks(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
    );
  }

  addBook(): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: { title: any; author: any; pages: any; publication_year: any; }) => {
      if (result) {
        const newBook = {
          title: result.title,
          author: result.author,
          pages: result.pages,
          publication_year: result.publication_year
        };

        this.apiService.addBook(newBook).subscribe({
          next: (response) => {
            this.books.push(response);
            this.filterBooks();
            alert('Le livre a été ajouté avec succès.');
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout du livre', error);
          }
        });
      }
    });
  }

  showBookDetails(book: any): void {
    this.dialog.open(BookDetailsComponent, {
      width: '400px',
      data: book
    });
  }

  deleteBook(id: number): void {
    this.apiService.deleteBook(id).subscribe({
      next: () => {
        this.books = this.books.filter(book => book.id !== id);
        this.filterBooks();
        alert('Le livre a été supprimé avec succès.');
      },
      error: (error) => {
        alert('Ce livre est actuellement emprunté et ne peut pas être supprimé.');
        console.error('Erreur lors de la suppression du livre', error);
      }
    });
  }
}
