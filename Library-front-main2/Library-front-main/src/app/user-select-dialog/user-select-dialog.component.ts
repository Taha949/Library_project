import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select-dialog.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    NgForOf,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
  ]
})
export class UserSelectDialogComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<UserSelectDialogComponent>
  ) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log(this.users);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    });
  }

  onConfirm(): void {
    if (this.selectedUser) {
      console.log('Utilisateur sélectionné :', this.selectedUser);
      this.dialogRef.close(this.selectedUser);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
