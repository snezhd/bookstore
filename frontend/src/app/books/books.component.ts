import { Component } from '@angular/core';
import { IBook } from './book.interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  tableTitle: string = 'Welcome to the books\' table';
  listFilter: string = '';
  showImage: boolean = false;

  books: IBook[] = [
    {
      id: 1,
      title: '1984',
      author: 'George Orwell',
      dateOfPublishing: '1961',
      image: 'https://m.media-amazon.com/images/I/41E9Z5XaHcL.jpg',
      description: 'Written more than 70 years ago, 1984 was George Orwell\'s chilling prophecy about the future. And while 1984 has come and gone, his dystopian vision of a government that will do anything to control the narrative is timelier than ever...',
      pages: 328,
      price: 7.85
    },
    {
      id: 2,
      title: 'Animal Farm',
      author: 'George Orwell',
      dateOfPublishing: '2004',
      image: 'https://images-na.ssl-images-amazon.com/images/I/71wdbkiRokL.jpg',
      description: 'George Orwell\'s timeless and timely allegorical novel—a scathing satire on a downtrodden society\'s blind march towards totalitarianism.',
      pages: 140,
      price: 7.48
    }
  ]

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
