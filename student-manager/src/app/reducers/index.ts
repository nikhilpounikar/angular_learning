import { ActionReducerMap } from "@ngrx/store";
import { authenticationReducer } from "./user-auth";



export const rootReducer = {};

export interface AppState {
    isAunthenticated: boolean;
};


// export const reducers: ActionReducerMap<AppState, any> = {
//     isAunthenticated: authenticationReducer
// };