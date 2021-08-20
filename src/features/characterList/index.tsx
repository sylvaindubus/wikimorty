import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from 'src/app/hooks'
import Pagination from 'src/components/pagination'

import './index.css'
import { fetchList, selectCharacters } from './reducer'
import DataList from './components/dataList'

const CharacterList = () => {
  const dispatch = useAppDispatch()

  const params = useParams<{ page: string | undefined }>()
  const page = parseInt(params.page || '1')
  const characters = useAppSelector(selectCharacters)

  useEffect(() => {
    dispatch(fetchList(page))
  }, [page, dispatch])

  return (
    <div className="CharacterList">
      {characters ? (
        <>
          <DataList characters={characters.results} />
          <Pagination pageCount={characters.info.pages} currentPage={page} baseUrl="/" />
        </>
      ) : null}
    </div>
  )
}

export default CharacterList
