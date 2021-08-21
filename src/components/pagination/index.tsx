import { useContext } from 'react'
import styled from 'styled-components'

import { DeviceContext } from 'src/contexts/device'
import { Link } from 'react-router-dom'

type PaginationProps = {
  pageCount: number
  currentPage: number
  basePath: string
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

const PageList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1em 0;
`

const Page = styled.li`
  margin: 0.5em;
  width: 1.5em;
  text-align: center;
`
const StyledLink = styled(Link)<{ $isCurrent?: boolean }>`
  font-weight: ${props => (props.$isCurrent ? 600 : 400)};
`

const Pagination = ({ pageCount, currentPage, basePath }: PaginationProps) => {
  const device = useContext(DeviceContext)
  const pages = calculatePages(pageCount, currentPage, device !== 'small' ? 9 : 7)

  return (
    <PageList>
      {pages.map((page, index) => (
        <Page key={index}>
          <StyledLink to={basePath + page} $isCurrent={page === currentPage}>
            {page}
          </StyledLink>
        </Page>
      ))}
    </PageList>
  )
}

export default Pagination
