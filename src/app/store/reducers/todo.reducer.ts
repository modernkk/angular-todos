import { Action, createReducer, on } from '@ngrx/store';
import { addTodo, deleteTodo } from '../actions/todo.actions';
import { v4 as uuidv4 } from 'uuid';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface TODO {
  id: string
  title: string
}

function getLocalState() {
  const localState = window.localStorage.getItem('todos')
  if (localState) {
    return JSON.parse(localState)
  }
  return {}
}
function setLocalState(todos: State) {
  window.localStorage.setItem('todos', JSON.stringify(todos))
}

export const todoFeatureKey = 'todo';

export interface State extends EntityState<TODO> { }

export const adapter: EntityAdapter<TODO> = createEntityAdapter<TODO>()

export const initialState: State = adapter.getInitialState(getLocalState());

export const reducer = createReducer(
  initialState,
  on(addTodo, (state, action) => {
    const newState = adapter.addOne({ id: uuidv4(), title: action.title }, state)
    setLocalState(newState)
    return newState
  }),
  on(deleteTodo, (state, action) => {
    const newState = adapter.removeOne(action.id, state)
    setLocalState(newState)
    return newState
  })
);

