import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './books-list/books-list.component';
import { BorrowComponent } from './borrow/borrow.component';

export const routes: Routes = [
  { path: 'search-books', component: BooksListComponent },
  { path: 'borrows', component: BorrowComponent },
  { path: '', redirectTo: '/search-books', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
