import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id: number;
  title: string;
  author: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Borrow {
  id: number;
  book: Book;
  user: User;
  borrowDate: string;
  returnDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  createBorrow(borrow: Partial<Borrow>): Observable<Borrow> {
    return this.http.post<Borrow>(`${this.baseUrl}/borrows`, borrow);
  }
  getBorrows(): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(`${this.baseUrl}/borrows`);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  addBook(book: { author: any; title: any }): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/books`, book);
  }

  editBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/books/${book.id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/books/${id}`);
  }
  deleteBorrow(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/borrows/${id}`);
  }
  updateBorrow(borrow: Borrow): Observable<Borrow> {
    return this.http.put<Borrow>(`${this.baseUrl}/borrows/${borrow.id}`, borrow);
  }
  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, user);
  }






}
