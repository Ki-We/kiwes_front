import {combineReducers} from '@reduxjs/toolkit';
import LanguageSlice from './LanguageSlice';

const RootReducer = combineReducers({
  language: LanguageSlice,
});

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
