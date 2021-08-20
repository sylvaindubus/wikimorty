import { gql } from '@apollo/client'

export default gql`
  query ($id: ID!) {
    character(id: $id) {
      name
      image
      status
      species
      gender
      origin {
        name
      }
      location {
        name
      }
      episode {
        name
        episode
      }
    }
  }
`
