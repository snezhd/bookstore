import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBook } from './book.interface';
import { BookService } from './book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {
  tableTitle: string = 'Welcome to the books\' table';
  errorMessage = '';
  showImage: boolean = false;
  sub!: Subscription;
  filteredBooks: IBook[] = [];
  books: IBook[] = [];

  private _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredBooks = this.performFilter(value);
  }

  constructor(private _bookService: BookService) {};

  ngOnInit(): void {
    this.sub = this._bookService.getBooks().subscribe({
      next: books => {
        this.books = books,
        this.filteredBooks = this.books;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IBook[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.books.filter((book: IBook) => book.title.toLocaleLowerCase().includes(filterBy));
  }

}
