import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  page: number
  nameFilter: string
}

const initialState: CharacterListState = {
  status: 'idle',
  list: null,
  page: 1,
  nameFilter: ''
}

type QueryOption = { page: number, nameFilter: string }

export const fetchList = createAsyncThunk(
  'characterList/fetchList',
  async (options: QueryOption) => {
    return await query({
      query: GET_CHARACTER_LIST,
      variables: options
    })
  }
)

export const characterListSlice = createSlice({
  name: 'CharacterList',
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    changeNameFilter: (state, action: PayloadAction<string>) => {
      state.nameFilter = action.payload
      state.page = 1
    },

  },
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

export const { changePage, changeNameFilter } = characterListSlice.actions

export const selectStatus = (state: RootState) => state.characterList.status
export const selectPage = (state: RootState) => state.characterList.page
export const selectNameFilter = (state: RootState) => state.characterList.nameFilter
export const selectCharacters = (state: RootState) => state.characterList.list

export default characterListSlice.reducer
