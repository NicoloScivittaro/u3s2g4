import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/photos';
  private favoriteCount = new BehaviorSubject<number>(0);
  favoriteCount$ = this.favoriteCount.asObservable();

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  deletePhoto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  incrementFavoriteCount(): void {
    this.favoriteCount.next(this.favoriteCount.value + 1);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('errore=orrore:', error.message);
    return throwError('riprova.');
  }
}
