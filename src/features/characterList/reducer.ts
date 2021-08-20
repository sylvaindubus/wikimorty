import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from 'src/app/store'
import { query } from 'src/app/api'
import Character from 'src/types/character'

import GET_CHARACTER_LIST from './gql/getCharacterList'

type List = {
  info: {
    count: number
    pages: number
  },
  results: Character[]
}

interface CharacterListState {
  status: 'init' | 'idle' | 'loading' | 'failed'
  list: List | null
}

const initialState: CharacterListState = {
  status: 'idle',
  list: null
}

export const fetchList = createAsyncThunk(
  'characterList/fetchList',
  async (page: number) => {
    return await query({
      query: GET_CHARACTER_LIST,
      variables: { page }
    })
  }
)

export const CharacterListSlice = createSlice({
  name: 'CharacterList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.status = 'idle'
        state.list = action.payload.data.characters
      })
      .addCase(fetchList.rejected, (state) => {
        state.status = 'failed'
        state.list = null
      })
  },
})

export const selectStatus = (state: RootState) => state.characterList.status

export const selectCharacters = (state: RootState) => state.characterList.list

export default CharacterListSlice.reducer
