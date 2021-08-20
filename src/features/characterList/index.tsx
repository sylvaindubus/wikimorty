import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from 'src/app/hooks'
import { fetchList, selectCharacters } from './reducer'

import './index.css'

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
      {characters !== null
        ? characters.results.map(character => (
            <p>
              <Link to={`/character/${character.id}`}>#{character.id}</Link>
              &nbsp;- {character.name} - {character.species}
            </p>
          ))
        : null}
      <Link to="/1">1</Link>
      <Link to="/2">2</Link>
      <Link to="/3">3</Link>
    </div>
  )
}

export default CharacterList
