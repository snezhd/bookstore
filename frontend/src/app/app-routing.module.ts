import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookDetailGuard } from './books/book-detail/book-detail.guard';
import { BooksComponent } from './books/books.component';

const routes: Routes = [
  { path: 'books', component: BooksComponent},
  {
    path: 'books/:id',
    canActivate: [BookDetailGuard],
    component: BookDetailComponent},
  { path: '', redirectTo: 'books', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
