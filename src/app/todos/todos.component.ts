import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoDataService } from '../todo-data.service';
import { Todo } from '../todo';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  constructor(
    private todoDataService: TodoDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data.todos)
      )
      .subscribe(
        (todos) => {
          this.todos = todos;
        }
      );
  }

  onAddTodo(todo: Todo) {
    this.todoDataService
      .addTodo(todo)
      .subscribe((newTodo) => {
        this.todos = this.todos.concat(newTodo);
      });
  }

  onToggleTodoComplete(todo) {
    this.todoDataService
      .toggleTodoComplete(todo)
      .subscribe((updatedTodo) => {
        todo = updatedTodo;
      });
  }

  onRemoveTodo(todo) {
    this.todoDataService
      .deleteTodoById(todo.id)
      .subscribe((_) => {
        this.todos = this.todos.filter((t) => t.id !== todo.id);
      });
  }
}
