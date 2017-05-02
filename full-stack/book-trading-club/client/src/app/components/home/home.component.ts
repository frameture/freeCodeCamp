import { Component, OnInit } from '@angular/core';

import { Book } from '../../models/book';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { BookService } from '../../services/book.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {

  books: Book[];
  user: User;
  userBooks: Book[];

  constructor(
    private authService: AuthService,
    private bookService: BookService,
    private userService: UserService
  ) { }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.getBooks();
    if (this.isLoggedIn()) {
      this.getUserAndUserBooks();
    }
  }

  onAccept(reqId: string): void {
    this.bookService
      .acceptRequest(reqId)
      .subscribe((res) => {
        this.userService.setProfile(res);
        this.getUserAndUserBooks();
        this.getBooks();
      });
  }

  onAddBook(bookId: string): void {
    this.bookService
      .addBook(bookId)
      .subscribe((res) => {
        this.userService.setProfile(res);
        this.getUserAndUserBooks();
        this.getBooks();
      });
  }

  onRemoveBook(bookId: string): void {
    this.bookService
      .removeBook(bookId)
      .subscribe((res) => {
        this.userService.setProfile(res);
        this.getUserAndUserBooks();
        this.getBooks();
      });
  }

  onRequest(bookId: string): void {
    if (this.user.books.indexOf(bookId) >= 0) { return; }
    this.bookService
      .addRequest(bookId)
      .subscribe((res) => {
        this.userService.setProfile(res);
        this.getUserAndUserBooks();
      });
  }

  private getBooks(): void {
    this.bookService
      .getBooks()
      .subscribe(res => this.books = res);
  }

  private getUserAndUserBooks(): void {
    this.user = this.userService.getProfile();
    this.userBooks = [];
    const bookIds = this.user.books;

    for (let i = 0; i < bookIds.length; i++) {
      const id = bookIds[ i ];

      this.bookService
        .getBook(id)
        .subscribe(res => {
          this.userBooks.push(res);
        });
    }
  }

}
