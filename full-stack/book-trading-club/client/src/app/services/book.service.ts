import { Book } from '../models/book';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { BackendService } from './backend.service';
import { UserService } from './user.service';

@Injectable()
export class BookService {

  constructor(
    private be: BackendService,
    private userService: UserService
  ) { }

  addBook(bookName: string): Observable<any> {
    const username = this.userService.getProfile().username;
    const book = new Book(bookName, username);
    return this.be.addBook(book);
  }

  acceptRequest(reqId: string): Observable<any> {
    const username = this.userService.getProfile().username;
    return this.be.acceptRequest(reqId, username);
  }

  addRequest(bookId: string): Observable<any> {
    const username = this.userService.getProfile().username;
    return this.be.addRequest(bookId, username);
  }

  getBook(bookId: string): Observable<any> {
    return this.be.getBook(bookId);
  }

  getBooks(): Observable<any> {
    return this.be.getBooks();
  }

  removeBook(bookId: string): Observable<any> {
    const username = this.userService.getProfile().username;
    return this.be.removeBook(username, bookId);
  }
}
