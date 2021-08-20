import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Character from 'src/types/character'

type DataListProps = {
  characters: Character[]
}

const Table = styled.table`
  td {
    padding: 10px;
  }
`

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
  border-radius: 50%;
  vertical-align: middle;
`

const DataList = ({ characters }: DataListProps) => {
  return (
    <Table>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Species</th>
        <th>Gender</th>
        <th>Location</th>
      </tr>
      {characters.map(character => (
        <tr>
          <td>
            <Avatar src={character.image} />
            <Link to={`/character/${character.id}`}>{character.name}</Link>
          </td>
          <td>{character.status}</td>
          <td>{character.species}</td>
          <td>{character.gender}</td>
          <td>{character.location.name}</td>
        </tr>
      ))}
    </Table>
  )
}

export default DataList
