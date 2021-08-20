import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { DeviceContext } from 'src/contexts/device'

type PaginationProps = {
  pageCount: number
  currentPage: number
  baseUrl: string
}

const calculatePages = (pageCount: number, currentPage: number, qtyDisplayed: number) => {
  if (pageCount === 0) return []

  const pages: Number[] = []
  pages.push(currentPage)
  let prevPage = currentPage - 1,
    nextPage = currentPage + 1
  // Try to find the closest pages compared to the current one
  while (pages.length < qtyDisplayed && (prevPage >= 1 || nextPage <= pageCount)) {
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
  padding: 1em 0;
`

const Page = styled(Link)<{ $isCurrent?: boolean }>`
  margin: 0.5em;
  width: 1.5em;
  color: inherit;
  font-weight: ${props => (props.$isCurrent ? 700 : 400)};
  text-decoration: none;
  text-align: center;
`

const Pagination = ({ pageCount, currentPage, baseUrl }: PaginationProps) => {
  const device = useContext(DeviceContext)
  const pages = calculatePages(pageCount, currentPage, device !== 'small' ? 9 : 7)

  return (
    <PageList>
      {pages.map((page, index) => (
        <Page to={baseUrl + page} $isCurrent={page === currentPage} key={index}>
          {page}
        </Page>
      ))}
    </PageList>
  )
}

export default Pagination
