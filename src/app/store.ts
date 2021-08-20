import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import characterListReducer from 'src/features/characterList/reducer'

export const store = configureStore({
	reducer: {
		characterList: characterListReducer,
	},
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
