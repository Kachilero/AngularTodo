import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Todo } from './todo';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Error handling
  private static handleError(error: HttpErrorResponse | any) {
    console.error('ApiService::handleError', error);
    return throwError(error.message);
  }

  // API: GET /todos
  public getAllTodos(): Observable<Todo[]> {
    return this.http
      .get(API_URL + '/todos')
      .pipe(
        map(response => {
          // @ts-ignore
          return response.map((todo) => new Todo(todo));
        }),
        catchError(ApiService.handleError)
      );
  }

  // API: GET /todos/:id
  public getTodoById(todoId: number): Observable<Todo> {
    return this.http
      .get(API_URL + '/todos/' + todoId)
      .pipe(
        map((response: Response) => {
          return new Todo(response);
        }),
        catchError(ApiService.handleError)
      );
  }

  // API: POST /todos
  public createTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post(API_URL + '/todos', todo)
      .pipe(
        map((response: Response) =>  {
          console.log('POST: ', response);
          return new Todo(response);
        }),
        catchError(ApiService.handleError)
      );
  }

  // API: PUT /todos/:id
  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put(API_URL + '/todos/' + todo.id, todo)
      .pipe(
        map((response: Response) => {
          return new Todo(response);
        }),
        catchError(ApiService.handleError)
      );
  }

  // API: DELETE /todos/:id
  public deleteTodoById(todoId: number): Observable<null> {
    return this.http
      .delete(API_URL + '/todos/' + todoId)
      .pipe(
        map((response: Response) => null),
        catchError(ApiService.handleError)
      );
  }
}
