import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Todo } from './todo';
import { ApiService } from './api.service';

@Injectable()
export class TodoDataService {

  constructor(private api: ApiService) { }

  // ADD POST
  addTodo(todo: Todo): Observable<Todo> {
    return this.api.createTodo(todo);
  }

  // DELETE
  deleteTodoById(todoId: number): Observable<Todo> {
    return this.api.deleteTodoById(todoId);
  }

  // PUT
  updateTodo(todo: Todo): Observable<Todo> {
    return this.api.updateTodo(todo);
  }
  /*updateTodoById(id: number, values: object = {}): Todo {
    const todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }*/

  // GET ALL
  getAllTodos(): Observable<Todo[]> {
    return this.api.getAllTodos();
  }

  // GET ONE
  getTodoById(todoId: number): Observable<Todo> {
    return this.api.deleteTodoById(todoId);
  }

  // Toggle DONE
  toggleTodoComplete(todo: Todo) {
    todo.complete = !todo.complete;
    return this.api.updateTodo(todo);
  }
}
