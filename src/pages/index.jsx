import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Img from 'gatsby-image';

import SEO from '../components/SEO';
import config from '../../data/SiteConfig';
import CtaButton from '../components/CtaButton';
import Header from '../components/Layout/Header';

class Index extends React.Component {
  render() {
    const allSEOMarkdown = this.props.data.allMarkdown.edges;

    return (
      <div className="index-container">
        <Helmet title={config.siteTitle} />
        <SEO postEdges={allSEOMarkdown} />
        <main>
          <IndexHeadContainer>
            <Img
              sizes={this.props.data.background.sizes}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
              }}
            />
            <HeaderContainer>
              <Header />
            </HeaderContainer>
            <Hero>
              <ImageWithMargin src="/logos/logo-150.png" alt="" />
              <h1 className="hide-sm">{config.siteTitle}</h1>
              <h4 className="hide-sm">{config.siteDescription}</h4>
            </Hero>
          </IndexHeadContainer>
          <BodyContainer>
            <h2>Greetings...</h2>
            <p>
              This site contains collection of Javascript code snippets/notes.
              The notes were written with the assumption that you have prior
              programming knowledge (e.g. in Java).
              <br />
              <br />Created using{' '}
              <a
                href="https://www.gatsbyjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                GatsbyJs
              </a>{' '}
              and Markdowns
            </p>
            <CtaButton to={'/1-1-basics'}>Get started</CtaButton>
          </BodyContainer>
        </main>
      </div>
    );
  }
}

export default Index;

const ImageWithMargin = styled.img`
  margin-top: 20px;

  @media screen and (max-width: 600px) {
    margin-top: 0px;
    height: 30vh;
    max-height: 150px;
    max-width: 150px;
  }

  @media handheld, (max-height: 300px), (orientation: landscape) {
    margin-top: -5px;
    height: 20vh;
    max-height: 150px;
    max-width: 150px;
  }
`;

const HeaderContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
`;

const IndexHeadContainer = styled.div`
  padding: ${props => props.theme.sitePadding};
  text-align: center;
  color: white;
  overflow: hidden;
  position: relative;
  height: 50vh;

  @media handheld, (max-height: 800px), (orientation: portrait) {
    height: 40vh;
  }
`;

const Hero = styled.div`
  padding: 50px 0;
  color: white;
  text-shadow: 2px 2px 4px #000000;

  & > h1 {
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    padding: 30px 0;
  }
`;

const BodyContainer = styled.div`
  padding: ${props => props.theme.sitePadding};
  max-width: ${props => props.theme.contentWidthLaptop};
  margin: 0 auto;

  .contributors {
    max-width: 400px;
    margin: 100px auto 0;
  }
`;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdown: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
    posts: allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { type: { eq: "post" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
    background: imageSharp(id: { regex: "/coding.png/" }) {
      sizes(maxWidth: 1240, quality: 100) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
