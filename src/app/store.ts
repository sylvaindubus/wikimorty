import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import characterListReducer from 'src/features/characterList/reducer'
import characterReducer from 'src/features/character/reducer'

export const store = configureStore({
	reducer: {
		characterList: characterListReducer,
		character: characterReducer,
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
