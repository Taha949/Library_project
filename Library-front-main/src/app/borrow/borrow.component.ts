import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiService, Borrow } from "../api.service";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from "../user-dialog/user-dialog.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput, MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule]
})
export class BorrowComponent implements OnInit {
  borrows: Borrow[] = [];
  filteredBorrows: Borrow[] = [];
  searchQuery: string = '';

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.apiService.getBorrows().subscribe({
      next: (data) => {
        this.borrows = data;
        this.filteredBorrows = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des emprunts', error);
      }
    });
  }

  returnBorrow(id: number): void {
    this.apiService.deleteBorrow(id).subscribe({
      next: () => {
        this.borrows = this.borrows.filter(borrow => borrow.id !== id);
        this.filterBorrows();
        console.log('Emprunt retourné avec succès');
        alert('Le livre a été retourné avec succès.');
      },
      error: (error) => {
        console.error('Erreur lors du retour de l\'emprunt', error);
      }
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Nouvel utilisateur ajouté');
      }
    });
  }

  extendBorrow(borrow: Borrow): void {
    const newReturnDate = new Date(borrow.returnDate);
    newReturnDate.setDate(newReturnDate.getDate() + 15);

    borrow.returnDate = newReturnDate.toISOString().split('T')[0];

    this.apiService.updateBorrow(borrow).subscribe({
      next: (updatedBorrow) => {
        this.borrows = this.borrows.map(b => b.id === updatedBorrow.id ? updatedBorrow : b);
        this.filterBorrows();
        console.log('Date de retour prolongée avec succès');
      },
      error: (error) => {
        console.error('Erreur lors de la prolongation de l\'emprunt', error);
      }
    });
  }

  filterBorrows(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredBorrows = this.borrows.filter(borrow =>
      borrow.book.title.toLowerCase().includes(query) ||
      borrow.user.name.toLowerCase().includes(query)
    );
  }
}
