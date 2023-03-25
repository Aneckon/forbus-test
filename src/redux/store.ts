import { configureStore } from '@reduxjs/toolkit';
import CardReducer from './reducers/cardSlice';

export const store = configureStore({ reducer: { CardReducer } });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch