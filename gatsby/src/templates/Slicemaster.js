import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

export default function SingleSlicemasterPage({ data: { slicemaster } }) {
  return (
    <>
      <SEO
        title={`Slicemaster ${slicemaster.name}`}
        image={slicemaster.image?.asset?.fluid?.src}
      />
      <SlicemasterGrid>
        <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
        <div>
          <h2 className="mark">{slicemaster.name}</h2>
          <div>
            <p>{slicemaster.description}</p>
          </div>
        </div>
      </SlicemasterGrid>
    </>
  );
}

// this needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      description
    }
  }
`;
