import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from 'layout/layout';
import SEO from 'components/seo';
import { Main, Content } from 'pages/index';
import TagsCount from '../components/tagsCount';

const Tags = ({ pageContext, data }) => {
  const { tag, tags } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;
  return (
    <Layout>
      <SEO title="Tag" />
      <Main>
        <Content>
          <TagsCount tags={tags}></TagsCount>
          <h1>{tagHeader}</h1>
          <ul>
            {edges.map(({ node }) => {
              const { title, date } = node.frontmatter;
              const { slug } = node.fields;
              return (
                <li key={slug}>
                  <Link to={slug}>
                    {title} ({date})
                  </Link>
                </li>
              );
            })}
          </ul>
        </Content>
      </Main>
    </Layout>
  );
};

export default Tags;

export const query = graphql`
  query ($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
