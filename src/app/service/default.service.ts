import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DefaultService {

  private url = 'http://localhost:8084/api/v2/';  // URL to web api

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  get(api: string): Observable<any> {
    console.log(this.url+api);
    return this.http.get<any>(this.url + api, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched any ss')),
        catchError(this.handleError<any[]>('get', []))
      );
  }

  save(obj: any, api: string): Observable<any> {
    console.log(JSON.stringify(obj));
    return this.http.post<any>(this.url + api, obj, this.httpOptions).pipe(
      tap((newObjeto: any) => console.log(`added w/ id=${newObjeto.id}`)),
      catchError(this.handleError<any>('save'))
    );
  }

  update(obj: any, api: string): Observable<any> {
    console.log(JSON.stringify(obj));
    return this.http.put<any>(this.url + api, obj, this.httpOptions).pipe(
      tap((newObjeto: any) => console.log(`added w/ id=${newObjeto.id}`)),
      catchError(this.handleError<any>('save'))
    );
  }


  delete(obj: any | number, api: string): Observable<any> {
    const id = typeof obj === 'number' ? obj : obj.id;
    const url = `${this.url + api}/${id}`;

    return this.http.delete<any>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted id=${id}`)),
      catchError(this.handleError<any>('delete'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
