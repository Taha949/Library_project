import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatButton} from "@angular/material/button";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [
    MatButton,
    NgClass
  ],
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isBooksActive: boolean = true;
  isBorrowsActive: boolean = false;

  constructor(private router: Router) {}

  navigateToSearchBooks() {
    this.isBooksActive = true;
    this.isBorrowsActive = false;
    this.router.navigate(['/search-books']);
  }

  navigateToBorrows() {
    this.isBooksActive = false;
    this.isBorrowsActive = true;
    this.router.navigate(['/borrows']);
  }
}
