import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService, Borrow } from '../api.service';
import { UserSelectDialogComponent } from '../user-select-dialog/user-select-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  public isBorrowed: boolean = false;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<BookDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.checkIfBorrowed();
  }

  checkIfBorrowed(): void {
    this.apiService.getBorrows().subscribe({
      next: (borrows: Borrow[]) => {
        this.isBorrowed = borrows.some(borrow => borrow.book.id === this.data.id);
      },
      error: (error) => {
        console.error('Erreur lors de la vérification de l\'emprunt', error);
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onBorrow(): void {
    if (!this.isBorrowed) {
      const dialogRef = this.dialog.open(UserSelectDialogComponent, {
        width: '400px'
      });

      dialogRef.afterClosed().subscribe((selectedUser: any) => {
        if (selectedUser) {
          const newBorrow: Partial<Borrow> = {
            book: { id: this.data.id, title: this.data.title, author: this.data.author },
            user: { id: selectedUser.id, name: selectedUser.name, email: selectedUser.email },
            borrowDate: new Date().toISOString().split('T')[0],
            returnDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0]
          };

          this.apiService.createBorrow(newBorrow).subscribe({
            next: (borrow: Borrow) => {
              console.log('Emprunt créé avec succès :', borrow);
              this.isBorrowed = true;
              alert('Le livre a été emprunté avec succès.');
            },
            error: (error) => {
              console.error('Erreur lors de la création de l\'emprunt', error);
            }
          });
        }
      });
    }
  }
}
