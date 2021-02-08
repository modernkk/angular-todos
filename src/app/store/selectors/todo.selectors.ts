import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '..';
import { adapter, State, todoFeatureKey } from '../reducers/todo.reducer';

const {
  selectIds,
  selectAll,
  selectEntities,
  selectTotal,
} = adapter.getSelectors()
export const selectTodo = createFeatureSelector<AppState, State>(todoFeatureKey)
export const selectTodos = createSelector(selectTodo, selectAll)

