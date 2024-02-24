import {configureStore} from '@reduxjs/toolkit';
import RootReducer from './RootReducer';

/**
 * 애플리케이션의 '상태'를 관리하기 위한 Stroe 구성
 */
export const Store = configureStore({
  reducer: RootReducer,
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
