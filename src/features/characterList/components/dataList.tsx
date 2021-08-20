import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Character from 'src/types/character'
import { DeviceContext } from 'src/contexts/device'

type DataListProps = {
  characters: Character[]
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    padding: 12px;
    font-weight: 600;
  }
  td {
    padding: 12px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`

const Avatar = styled.img<{ $isBig?: boolean }>`
  width: ${({ $isBig }) => ($isBig ? '64px' : '32px')};
  height: ${({ $isBig }) => ($isBig ? '64px' : '32px')};
  margin-right: 12px;
  border-radius: 50%;
`

const NameCell = styled.td`
  display: flex;
  align-items: center;
  text-align: left;
`

const SimpleCard = styled.li`
  display: flex;
  text-align: left;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 12px;

  &:first-child {
    border-top: none;
  }
`

const Error = styled.p`
  margin: 2em;
`

const DataList = ({ characters }: DataListProps) => {
  const device = useContext(DeviceContext)

  if (!characters.length) {
    return (
      <Error>
        😔
        <br />
        No results
      </Error>
    )
  }

  if (device === 'small') {
    return (
      <ul>
        {characters.map((character, index) => (
          <SimpleCard key={index}>
            <div>
              <Avatar $isBig src={character.image} alt={character.name} />
            </div>
            <div>
              <Link to={`/character/${character.id}`}>{character.name}</Link>
              <p>{character.status}</p>
              <p>{character.species}</p>
              <p>{character.gender}</p>
            </div>
          </SimpleCard>
        ))}
      </ul>
    )
  }

  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th>Status</th>
          <th>Species</th>
          <th>Gender</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {characters.map(character => (
          <tr key={character.id}>
            <NameCell>
              <Avatar src={character.image} />
              <Link to={`/character/${character.id}`}>{character.name}</Link>
            </NameCell>
            <td>{character.status}</td>
            <td>{character.species}</td>
            <td>{character.gender}</td>
            <td>{character.location.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default DataList
