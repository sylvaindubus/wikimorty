import { store } from 'src/app/store'

import { fetch } from './reducer'

describe('character reducer', () => {
	it('should fail data fetching if the id is unknown', async () => {
		// @TODO: Mock this API call
		await store.dispatch(fetch(0))
		expect(store.getState().character.character).toBeNull()
	})

	it('should handle simple data fetching', async () => {
		// @TODO: Mock this API call
		await store.dispatch(fetch(1))
		expect(store.getState().character.character?.name).toBe('Rick Sanchez')
	})
})
