import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from 'src/app/hooks'
import Spinner from 'src/components/spinner'
import ErrorMessage from 'src/components/errorMessage'
import Card from 'src/components/card'

import { fetch, selectStatus, selectCharacter } from './reducer'

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  margin: 64px 12px 12px;

  @media (min-width: 768px) {
    min-width: 640px;
    padding: 0 32px;
  }
`

const Header = styled.header`
  margin-bottom: 32px;
`

const Avatar = styled.img`
  display: block;
  width: 128px;
  height: 128px;
  margin: -64px 0 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
`

const Name = styled.h2`
  font-size: 2rem;
`

const Infos = styled.ul`
  display: flex;
  flex-direction: column;
`

const Info = styled.li`
  margin-bottom: 1.5em;
`

const InfoLabel = styled.p`
  margin-bottom: 0.25em;
  font-weight: 600;
`

const EpisodeList = styled.ul`
  margin: 0 16px;
`

const Character = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams<{ id: string | undefined }>()
  const status = useAppSelector(selectStatus)
  const character = useAppSelector(selectCharacter)

  useEffect(() => {
    dispatch(fetch(parseInt(id || '')))
  }, [id, dispatch])

  if (status === 'init' || status === 'loading') return <Spinner />

  if (!character) {
    return <ErrorMessage>I didn't find this character. 😞</ErrorMessage>
  }

  return (
    <Wrapper as="article">
      <Avatar src={character?.image} alt={character.name} />
      <Header>
        <Name>{character.name}</Name>
        <p>{character.status}</p>
      </Header>
      <Infos>
        <Info>
          <InfoLabel>Species</InfoLabel>
          <p>{character.species}</p>
        </Info>
        <Info>
          <InfoLabel>Gender</InfoLabel>
          <p>{character.gender}</p>
        </Info>
        {character.origin ? (
          <Info>
            <InfoLabel>Origin</InfoLabel>
            <p>{character.origin.name}</p>
          </Info>
        ) : null}
        {character.location ? (
          <Info>
            <InfoLabel>Location</InfoLabel>
            <p>{character.location.name}</p>
          </Info>
        ) : null}
        <Info>
          <InfoLabel>Episodes ({character.episode.length})</InfoLabel>
          <EpisodeList>
            {character.episode.map(({ name, episode }) => (
              <li key={episode}>
                {episode} - {name}
              </li>
            ))}
          </EpisodeList>
        </Info>
      </Infos>
    </Wrapper>
  )
}

export default Character
