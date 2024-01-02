// import the interface
import { Course } from '../models/course.model';
import { CourseAction, CourseActionType } from '../actions/course.action';
//create a dummy initial state
const initialState: Array<Course> = [];

export function courseReducer(
  state: Array<Course> = initialState,
  action: CourseAction,
) {
  switch (action.type) {
    case CourseActionType.ADD_ITEM:
      return [...state, action.payload];
    default:
      return state;
  }
}