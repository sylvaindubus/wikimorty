import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from 'src/app/hooks'
import Spinner from 'src/components/spinner'
import ErrorMessage from 'src/components/errorMessage'
import Card from 'src/components/card'
import Pagination from 'src/components/pagination'

import { fetchList, selectStatus, selectCharacters } from './reducer'
import DataList from './components/dataList'

const Wrapper = styled(Card)`
  width: calc(100% - 24px);

  @media (min-width: 768px) {
    width: auto;
    min-width: 640px;
    padding: 32px 32px 0;
  }
`

const CharacterList = () => {
  const dispatch = useAppDispatch()

  const params = useParams<{ page: string | undefined }>()
  const page = parseInt(params.page || '1')
  const status = useAppSelector(selectStatus)
  const characters = useAppSelector(selectCharacters)

  useEffect(() => {
    dispatch(fetchList(page))
  }, [page, dispatch])

  if (status === 'init') return null
  if (status === 'loading') return <Spinner />

  if (status === 'failed' || !characters?.results?.length) {
    return <ErrorMessage>I didn't find any character. 😞</ErrorMessage>
  }

  return (
    <Wrapper>
      {characters ? (
        <>
          <DataList characters={characters.results} />
          <Pagination pageCount={characters.info.pages} currentPage={page} baseUrl="/" />
        </>
      ) : null}
    </Wrapper>
  )
}

export default CharacterList
