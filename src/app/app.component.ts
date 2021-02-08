import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from './store';
import { fromEvent, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { addTodo, deleteTodo } from './store/actions/todo.actions';
import { TODO } from './store/reducers/todo.reducer';
import { selectTodos } from './store/selectors/todo.selectors';
import { slideAnimation, todoAnimations } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
  animations: [
    slideAnimation,
    todoAnimations,
  ]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('AddTodoInput') AddTodoInput!: ElementRef
  todos: Observable<TODO[]>
  constructor(
    private store: Store<AppState>
  ) {
    this.todos = this.store.pipe(select(selectTodos))
  }

  ngAfterViewInit() {
    fromEvent<KeyboardEvent>(this.AddTodoInput.nativeElement, 'keyup')
      .pipe(
        filter((event) => event.key === 'Enter'),
        map(event => (<HTMLInputElement>event.target).value),
        map(title => title.trim()),
        filter(title => title !== "")
      )
      .subscribe(title => {
        this.store.dispatch(addTodo({ title }))
        this.AddTodoInput.nativeElement.value = ""
      })
  }
  deleteTodo(id: string) {
    this.store.dispatch(deleteTodo({ id }))
  }
}
