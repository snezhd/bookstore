import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, catchError, throwError } from "rxjs";
import { IBook } from "./book.interface";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:3000';

  constructor(private _http: HttpClient) {}

  getBooks(): Observable<IBook[]> {
    return this._http.get<IBook[]>(`${this.baseUrl}/api/books`).pipe(
      tap((data) => console.log('All', JSON.stringify(data))),
      catchError(this._handleError)
    )
  }

  private _handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if ( err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred ${err.error.message}`;
    } else {
      errorMessage = `Server returned status ${err.status} and message ${err.message}`;
    }
    return throwError(() => errorMessage);
  }
}
