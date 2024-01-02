import { ActionReducerMap } from "@ngrx/store";
import { Course } from "../models/course.model";
import { courseReducer } from "./course.reducer";


export const rootReducer = {};

export interface AppState {
    courseList: Array<Course>;
};


export const reducers: ActionReducerMap<AppState, any> = {
    courseList: courseReducer
};