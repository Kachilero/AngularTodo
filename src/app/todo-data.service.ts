import { Injectable } from '@angular/core';

import { Todo } from './todo';

@Injectable()
export class TodoDataService {
  // Placeholder for last ID so we can simulate automatic incrementing IDs
  lastId: number = 0;
  // Placehholder for Todos
  todos: Todo[] = [];

  constructor() { }

  // ADD
  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  // DELETE
  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    return this;
  }

  // PUT
  updateTodoById(id: number, values: object = {}): Todo {
    const todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // GET ALL
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // GET ONE
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // Toggle DONE
  toggleTodoComplete(todo: Todo) {
    const updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }
}
