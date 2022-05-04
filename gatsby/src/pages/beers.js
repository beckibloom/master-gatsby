import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

const SingleBeerStyles = styled.li`
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    height: 150px;
    width: 150px;
    object-fit: contain;
    font-size: 10px;
    display: grid;
    align-items: center;
  }
`;

const BeerListStyles = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  li:nth-child(odd) {
    background: var(--grey);
  }
`;

function SingleBeer({ beer }) {
  const rating = Math.round(beer.rating.average);
  return (
    <SingleBeerStyles>
      <div>
        <p>{beer.name}</p>
        <p>{beer.price}</p>
        <p title={`${rating} out of 5 stars`}>
          {`⭐`.repeat(rating)}
          <span style={{ filter: `grayscale(100%)` }}>
            {`⭐`.repeat(5 - rating)}
          </span>
          ({beer.rating.reviews})
        </p>
      </div>
      <img src={beer.image} alt={beer.name} />
    </SingleBeerStyles>
  );
}

export default function BeersPage({ data: { beers } }) {
  return (
    <>
      <SEO title={`Beers on tap (${beers.totalCount})`} />
      <h2>
        Current number of beers on tap:{' '}
        <span className="mark">{beers.totalCount}</span>
      </h2>
      <BeerListStyles>
        {beers.nodes.map((beer) => (
          <SingleBeer key={beer.id} beer={beer} />
        ))}
      </BeerListStyles>
    </>
  );
}

export const query = graphql`
  query BeerQuery {
    beers: allBeer {
      totalCount
      nodes {
        name
        price
        rating {
          reviews
          average
        }
        image
        id
      }
    }
  }
`;
