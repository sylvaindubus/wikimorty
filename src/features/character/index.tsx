import { useParams } from 'react-router-dom'

import './index.css'

const Character = () => {
  let { id } = useParams<{ id: string }>()

  return (
    <div className="Character">
      <p>Character ID: {id}</p>
    </div>
  )
}

export default Character
