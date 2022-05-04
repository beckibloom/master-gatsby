import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-items: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  text-align: center;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
  @media (max-width: 800px) {
    .word {
      display: none;
    }
    font-size: 1.4rem;
  }
`;

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  base,
}) {
  // make some variables
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;

  // deployed site showing error when on page 1 or last page - presumably because the Link is rendering and linking to a page that does not exist?
  return (
    <PaginationStyles>
      <Link
        to={hasPrevPage ? `${base}/${prevPage}` : ''}
        disabled={!hasPrevPage}
        title="Previous page"
      >
        &#8592; <span className="word">Prev</span>
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          className={currentPage === i + 1 ? 'current' : ''}
          to={`${base}/${i > 0 ? i + 1 : ''}`}
          key={`pagination-page-${i}`}
        >
          {i + 1}
        </Link>
      ))}
      <Link
        to={hasNextPage ? `${base}/${nextPage}` : ''}
        disabled={!hasNextPage}
        title="Next page"
      >
        <span className="word">Next</span> &#8594;
      </Link>
    </PaginationStyles>
  );
}
