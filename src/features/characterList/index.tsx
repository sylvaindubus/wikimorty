import { useEffect } from 'react'
import styled from 'styled-components'

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
    width: auto;
    min-width: 640px;
    max-width: calc(100% - 24px);
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

  const status = useAppSelector(selectStatus)
  const characters = useAppSelector(selectCharacters)
  const page = useAppSelector(selectPage)
  const nameFilter = useAppSelector(selectNameFilter)

  useEffect(() => {
    dispatch(fetchList({ page, nameFilter }))
  }, [page, nameFilter, dispatch])

  const handlePageChange = (page: number) => {
    dispatch(changePage(page))
  }

  const handleNameFilterChange = (name: string) => {
    dispatch(changeNameFilter(name))
  }

  return (
    <Wrapper>
      <Header>
        <Counter>
          {characters?.info.count || 0} character{characters?.info.count !== 1 ? 's' : ''}
        </Counter>
        <NameFilter defaultValue={nameFilter} onChange={handleNameFilterChange} />
      </Header>
      {status === 'init' || status === 'loading' ? (
        <Spinner />
      ) : (
        <DataList characters={characters?.results ?? []} />
      )}
      <Pagination
        onChange={handlePageChange}
        pageCount={characters?.info?.pages || 0}
        currentPage={page}
      />
    </Wrapper>
  )
}

export default CharacterList
