// import the interface
import { Course } from '../models/course.model';
import { CourseAction, CourseActionType } from '../actions/course.action';
import { Action, createReducer, on } from '@ngrx/store';
import { State } from '../models/state.model';
//create a dummy initial state
const initialState: Array<Course> = [];

export function courseReducer(
  state: Array<Course> = initialState,
  action: CourseAction
) {
  console.log(action);
  switch (action.type) {
    case CourseActionType.ADD_ITEM:
      return [...state, action.payload];
    default:
      return state;
  }
}


