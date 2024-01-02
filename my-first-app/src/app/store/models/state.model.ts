import { Course } from './course.model';

export interface State {
  readonly courses: Array<Course>;
}