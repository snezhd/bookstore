import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBook } from '../book.interface';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  pageTitle: string = 'Book Details';
  errorMessage = '';
  sub!: Subscription;
  book!: IBook;

  constructor(private _route: ActivatedRoute, private _bookService: BookService) { }

  ngOnInit(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;

    this.sub = this._bookService.getSpecificBook(id).subscribe({
      next: book => {
        this.book = book
      },
      error: err => this.errorMessage = err
    });
  }

}
