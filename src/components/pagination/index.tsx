import { Link } from 'react-router-dom'
import styled from 'styled-components'

type PaginationProps = {
  pageCount: number
  currentPage: number
  baseUrl: string
}

const calculatePages = (pageCount: number, currentPage: number) => {
  if (pageCount === 0) return []

  const pages: Number[] = []
  pages.push(currentPage)
  let prevPage = currentPage - 1,
    nextPage = currentPage + 1
  // Try to find the closest pages compared to the current one
  while (pages.length < 9) {
    if (prevPage >= 1) {
      pages.unshift(prevPage)
    }
    if (nextPage <= pageCount) {
      pages.push(nextPage)
    }
    prevPage--
    nextPage++
  }

  return pages
}

const PageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Page = styled(Link)<{ isCurrent: boolean }>`
  margin: 0.5em;
  width: 1.5em;
  color: inherit;
  font-size: 1.5rem;
  font-weight: ${({ isCurrent }) => (isCurrent ? 700 : 400)};
  text-decoration: none;
  text-align: center;

  @media (min-width: 480px) {
    margin: 1em 0.5em;
    font-size: 2rem;
  }
`

const Pagination = ({ pageCount, currentPage, baseUrl }: PaginationProps) => {
  const pages = calculatePages(pageCount, currentPage)

  return (
    <PageList>
      {pages.map(page => (
        <Page to={baseUrl + page} isCurrent={page === currentPage}>
          {page}
        </Page>
      ))}
    </PageList>
  )
}

export default Pagination
