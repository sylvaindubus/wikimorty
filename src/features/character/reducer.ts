import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from 'src/app/store'
import { query } from 'src/app/api'
import Character from 'src/types/character'

import GET_CHARACTER from './gql/getCharacter'

interface CharacterState {
  status: 'init' | 'idle' | 'loading' | 'failed'
  character: Character | null
}

const initialState: CharacterState = {
  status: 'init',
  character: null
}

export const fetch = createAsyncThunk(
  'character/fetch',
  async (id: number) => {
    return await query({
      query: GET_CHARACTER,
      variables: { id }
    })
  }
)

export const CharacterSlice = createSlice({
  name: 'Character',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetch.fulfilled, (state, action) => {
        state.status = 'idle'
        state.character = action.payload.data.character
      })
      .addCase(fetch.rejected, (state) => {
        state.status = 'failed'
        state.character = null
      })
  },
})

export const selectStatus = (state: RootState) => state.character.status

export const selectCharacter = (state: RootState) => state.character.character

export default CharacterSlice.reducer
