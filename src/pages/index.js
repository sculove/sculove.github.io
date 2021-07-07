import React, { useState, useLayoutEffect } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from 'layout/layout';
import SEO from 'components/seo';
import PostGrid from 'components/postGrid/postGrid';
import CategoryFilter from 'components/categoryFilter';
import useSiteMetadata from 'hooks/useSiteMetadata';

function setFilteredPosts(currentCategory, postData, setPosts) {
  const filteredPostData = currentCategory
    ? postData.filter(
        ({ node }) => node.frontmatter.category === currentCategory
      )
    : postData;

  filteredPostData.forEach(({ node }) => {
    const {
      id,
      fields: { slug },
      frontmatter: { title, desc, date, category, thumbnail },
    } = node;

    const posts = (prevPost) => [
      ...prevPost,
      {
        id,
        slug,
        title,
        desc,
        date,
        category,
        thumbnail: thumbnail?.childImageSharp?.id,
      },
    ];
    setPosts(posts);
  });
  return filteredPostData;
}

const Home = ({ pageContext, data }) => {
  const [posts, setPosts] = useState([]);
  const currentCategory = pageContext.category;
  const postData = data.allMarkdownRemark.edges;

  useLayoutEffect(() => {
    setFilteredPosts(currentCategory, postData, setPosts);
  }, [currentCategory, postData]);

  const site = useSiteMetadata();
  const postTitle = currentCategory || site.siteMetadata.postTitle;

  return (
    <Layout>
      <SEO title="Home" />
      <Main>
        <Content>
          <CategoryFilter categoryList={data.allMarkdownRemark.group} />
          <PostTitle>{postTitle}</PostTitle>
          <PostGrid posts={posts} />
        </Content>
      </Main>
    </Layout>
  );
};

export const Main = styled.main`
  min-width: var(--min-width);
  min-height: calc(100vh - var(--nav-height) - var(--footer-height));
  background-color: var(--color-background);
`;

export const Content = styled.div`
  box-sizing: content-box;
  width: 87.5%;
  max-width: var(--width);
  padding-top: var(--sizing-lg);
  padding-bottom: var(--sizing-lg);
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    padding-top: var(--grid-gap-lg);
    width: 87.5%;
  }
`;

const PostTitle = styled.h2`
  font-size: 2rem;
  font-weight: var(--font-weight-extra-bold);
  margin-bottom: var(--sizing-md);
  line-height: 1.21875;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    font-size: 1.75rem;
  }
`;

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(content/post)/" } }
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            category
            date(formatString: "YYYY-MM-DD")
            desc
            thumbnail {
              childImageSharp {
                id
              }
              base
            }
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default Home;
