import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from 'src/app/hooks'
import { fetchList, selectCharacters } from './reducer'

import './index.css'
import Pagination from 'src/components/pagination'

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
          {characters.results.map(character => (
            <p>
              <Link to={`/character/${character.id}`}>#{character.id}</Link>
              &nbsp;- {character.name} - {character.species}
            </p>
          ))}
          <Pagination pageCount={characters?.info.pages} currentPage={page} baseUrl="/" />
        </>
      ) : null}
    </div>
  )
}

export default CharacterList
