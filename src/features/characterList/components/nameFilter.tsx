import { useState, useCallback, useRef } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  text-align: left;
`

type NameFilterProps = {
  onChange: Function
  defaultValue?: string
}

const NameFilter = ({ onChange, defaultValue = '' }: NameFilterProps) => {
  const [name, setName] = useState(defaultValue)
  const refTimeout: { current: NodeJS.Timeout | null } = useRef(null)

  const handleChange = useCallback(
    e => {
      const value = e.target.value

      // Update this component
      setName(value)

      // Notify the parent after a short delay
      if (refTimeout.current) clearTimeout(refTimeout.current)
      refTimeout.current = setTimeout(() => {
        onChange(value)
      }, 350)
    },
    [onChange]
  )

  return (
    <Wrapper>
      <label>Name:</label>&nbsp;
      <input type="text" value={name} onChange={handleChange} />
    </Wrapper>
  )
}

export default NameFilter
