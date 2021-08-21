import { store } from 'src/app/store'

import reducer, {
	changeNameFilter,
	changePage,
	fetchList,
	initialState,
} from './reducer'

describe('characterList reducer', () => {
	it('should handle page change', () => {
		const actual = reducer(initialState, changePage(2))
		expect(actual.page).toEqual(2)
	})

	it('should handle name filter change', () => {
		const actual = reducer({ ...initialState, page: 3 }, changeNameFilter('Rick'))
		expect(actual.nameFilter).toEqual('Rick')
		expect(actual.page).toEqual(1)
	})

	it('should handle simple data fetching', async () => {
		// @TODO: Mock this API call
		await store.dispatch(fetchList())
		expect(store.getState().characterList.list?.info.count).toBeGreaterThan(600)
		expect(store.getState().characterList.list?.results.length).toBe(20)
		expect(store.getState().characterList.list?.results[0].name).toBe('Rick Sanchez')
	})

	it('should handle data fetching with params', async () => {
		// @TODO: Mock this API call
		await store.dispatch(fetchList({ page: 2, nameFilter: 'Rick' }))
		expect(store.getState().characterList.list?.info.count).toBe(84)
		expect(store.getState().characterList.list?.results.length).toBe(20)
		expect(store.getState().characterList.list?.results[0].name).toBe('Mechanical Rick')
	})
})
