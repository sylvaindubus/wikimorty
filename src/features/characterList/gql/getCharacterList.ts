import { gql } from '@apollo/client'

export default gql`
  query ($page: Int, $nameFilter: String) {
    characters(page: $page, filter: { name: $nameFilter }) {
      info {
        count
        pages
      }
      results {
        id
        name
        image
        status
        species
        gender
        location {
          name
        }
      }
    }
  }
`
