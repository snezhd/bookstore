import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  pageTitle: string = 'Book Details'

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));

    this.pageTitle += `: ${id}`;
  }

}
