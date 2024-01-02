// import the interface
import { Course } from '../models/course.model';
import { CourseAction, CourseActionType } from '../actions/course.action';
//create a dummy initial state
const initialState: Array<Course> = [
  {
    id: '1',
    name: 'C++ Programming',
    description: 'The Main Language to study DSA',
    price: 999,
    currency:'INR',
  },
];
export function courseReducer(
  state: Array<Course> = initialState,
  action: CourseAction
) {
  switch (action.type) {
    case CourseActionType.ADD_ITEM:
      return [...state, action.payload];
    default:
      return state;
  }
}