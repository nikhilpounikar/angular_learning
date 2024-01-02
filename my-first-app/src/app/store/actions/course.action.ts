import { Action } from '@ngrx/store';
import { Course } from '../models/course.model';
export enum CourseActionType {
  ADD_ITEM = '[COURSE] Add Course',
}
export class AddItemAction implements Action {
  readonly type = CourseActionType.ADD_ITEM;
  //add an optional payload
  constructor(public payload: Course) {}
}
export type CourseAction = AddItemAction;