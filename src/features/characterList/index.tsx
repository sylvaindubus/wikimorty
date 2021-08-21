import { useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from 'src/app/hooks'
import Spinner from 'src/components/spinner'
import Card from 'src/components/card'
import Pagination from 'src/components/pagination'

import {
  fetchList,
  changePage,
  changeNameFilter,
  selectStatus,
  selectCharacters,
  selectPage,
  selectNameFilter,
} from './reducer'
import DataList from './components/dataList'
import NameFilter from './components/nameFilter'

const Wrapper = styled(Card)`
  width: calc(100% - 24px);

  @media (min-width: 768px) {
    max-width: 1280px;
    padding: 32px 32px 0;
  }
`

const Header = styled.header`
  padding: 16px;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const Counter = styled.div`
  margin: 1em 0;
  font-weight: 600;
`

const CharacterList = () => {
  const dispatch = useAppDispatch()

  const params = useParams<{ page: string | undefined }>()
  const status = useAppSelector(selectStatus)
  const characters = useAppSelector(selectCharacters)
  const page = useAppSelector(selectPage)
  const nameFilter = useAppSelector(selectNameFilter)

  useEffect(() => {
    // @TODO: improve this line
    if (!page) return // prevent initial fetching (before we can get the page from the URL)
    dispatch(fetchList({ page, nameFilter }))
  }, [page, nameFilter, dispatch])

  useEffect(() => {
    dispatch(changePage(parseInt(params.page ?? '1')))
  }, [params.page, dispatch])

  const handleNameFilterChange = (name: string) => {
    dispatch(changeNameFilter(name))
  }

  if (status === 'init') return <Spinner />

  return (
    <Wrapper data-test-id="characterList">
      <Header>
        <Counter>
          {characters?.info.count || 0} character{characters?.info.count !== 1 ? 's' : ''}
        </Counter>
        <NameFilter defaultValue={nameFilter} onChange={handleNameFilterChange} />
      </Header>
      <DataList characters={characters?.results ?? []} />
      <Pagination pageCount={characters?.info?.pages || 0} currentPage={page} basePath="/" />
    </Wrapper>
  )
}

export default CharacterList
