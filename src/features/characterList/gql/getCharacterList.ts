import { gql } from "@apollo/client"

export default gql`
  query ($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        species
      }
    }
  }
`
