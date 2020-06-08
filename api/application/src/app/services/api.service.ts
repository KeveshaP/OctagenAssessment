import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(protected http: HttpClient) { }
  protected getDownloads<I,O>(path: string, data: I): Observable<O> {
    return this.http.get<O>(`${environment.api}/${path}`,data).pipe(
      map((r) => {
        return r;
      })
    );
  }
  protected get<O>(path: string): Observable<O> {
    return this.http.get<O>(`${environment.api}/${path}`).pipe(
      map((r) => {
        return r;
      })
    );
  }

  protected post<I, O>(path: string, data: I): Observable<O> {
    return this.http.post<O>(`${environment.api}/${path}`, data).pipe(
      map((r) => {
        return r;
      })
    );
  }

  protected delete<I, O>(path: string, data: I): Observable<O> {
    return this.http.delete<O>(`${environment.api}/${path}`, data).pipe(
      map((r) => {
        return r;
      })
    );
  }

  protected put<I, O>(path: string, data: I): Observable<O> {
    return this.http.put<O>(`${environment.api}/${path}`, data).pipe(
      map((r) => {
        return r;
      })
    );
  }
}
