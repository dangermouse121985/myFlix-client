import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/movies";
import userReducer from "./reducers/user";
import genresReducer from "./reducers/genres"
import directorsReducer from "./reducers/directors"
import actorsReducer from "./reducers/actors"

export const store = configureStore({
    reducer: { movies: moviesReducer, user: userReducer, genres: genresReducer, directors: directorsReducer, actors: actorsReducer }
});
