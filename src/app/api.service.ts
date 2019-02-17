import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';

import {Todo} from './todo';

import {Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {SessionServiceService} from './session-service.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private session: SessionServiceService) { }

  // Error handling
  private static handleError(error: HttpErrorResponse | any) {
    console.error('ApiService::handleError', error);
    if (error.status === 401) {
      console.log('401');
      return throwError(error);
    }
    return throwError(error.message);
  }

  // Sign in
  public signIn(username: string, password: string) {
    return this.http
      .post(API_URL + '/sign-in', {
        username,
        password
      })
      .pipe(
        map(response => response),
        catchError(ApiService.handleError)
      );
  }

  // API: GET /todos
  public getAllTodos(): Observable<Todo[]> {
    const options = this.getRequestOptions();
    return this.http
      .get(API_URL + '/todos', options)
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
    const options = this.getRequestOptions();
    return this.http
      .get(API_URL + '/todos/' + todoId, options)
      .pipe(
        map((response) => {
          return new Todo(response);
        }),
        catchError(ApiService.handleError)
      );
  }

  // API: POST /todos
  public createTodo(todo: Todo): Observable<Todo> {
    const options = this.getRequestOptions();
    return this.http
      .post(API_URL + '/todos', todo, options)
      .pipe(
        map((response) =>  {
          console.log('POST: ', response);
          return new Todo(response);
        }),
        catchError(ApiService.handleError)
      );
  }

  // API: PUT /todos/:id
  public updateTodo(todo: Todo): Observable<Todo> {
    const options = this.getRequestOptions();
    return this.http
      .put(API_URL + '/todos/' + todo.id, todo, options)
      .pipe(
        map((response) => {
          return new Todo(response);
        }),
        catchError(ApiService.handleError)
      );
  }

  // API: DELETE /todos/:id
  public deleteTodoById(todoId: number): Observable<null> {
    const options = this.getRequestOptions();
    return this.http
      .delete(API_URL + '/todos/' + todoId, options)
      .pipe(
        map((response) => null),
        catchError(ApiService.handleError)
      );
  }

  // Options
  private getRequestOptions() {
    console.log('getRequestOptions: ', this.session.accessToken);
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.session.accessToken
      })
    };
  }
}
