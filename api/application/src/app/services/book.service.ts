import { Injectable } from '@angular/core';
import { Api } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookApiService extends Api {

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getAll(): Observable<any[]> {
    return this.get<any[]>('api/book/get');
  }
  public getAddressById(id:number): Observable<any[]> {
    return this.get<any[]>(`api/book/get/${id}`);
  }
  public postAddress(data): Observable<any[]> {
    return this.post<any,any>('api/book',data);
  }
  public deleteAddress(id:number):Observable<any[]>{
    return this.delete<any,any>(`api/book/${id}`,{});
  }
  public postFile(data):Observable<any[]>{
    return this.post<any,any>(`api/book/multiple/upload`,data);
  }
  public putFile(file):Observable<any[]>{
  return this.put<any,any>(`api/book/edit`,file);
}
}
