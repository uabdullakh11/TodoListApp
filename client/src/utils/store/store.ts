import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import { todosApi } from "../services/todo.service";
// import { authApi } from "../services/auth.service";
// import { usersApi } from "../services/user.service";
import api from '../services/http.service'

export const store = configureStore({
  reducer: {
    // [todosApi.reducerPath]: todosApi.reducer,
    // [authApi.reducerPath]: authApi.reducer,
    // [usersApi.reducerPath]: usersApi.reducer,
    [api.reducerPath]: api.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // todosApi.middleware,
      // authApi.middleware,
      // usersApi.middleware
      api.middleware
    ),
});

// const rootReducer = combineReducers({
//   reducer: {
//     [todosApi.reducerPath]: todosApi.reducer,
//   },
//   firstNamedReducer,
//   secondNamedReducer,
// });

setupListeners(store.dispatch);
