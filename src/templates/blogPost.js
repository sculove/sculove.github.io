import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from 'layout/layout';
import SEO from 'components/seo';
import Comment from 'components/comment';
import { Divider } from 'components/post';
import Article from 'components/article';

const BlogPost = ({ data, pageContext }) => {
  const {
    markdownRemark: {
      frontmatter: {
        title,
        desc,
        thumbnail,
        date,
        category,
        tags,
        disableToc = false,
      },
      html,
      tableOfContents,
    },
  } = data;
  const buyMeACoffeeId = data?.site?.siteMetadata?.sponsor?.buyMeACoffeeId || null;
  const ogImagePath = thumbnail && thumbnail.childImageSharp.fixed.src;
  return (
    <Layout>
      <SEO title={title} description={desc} image={ogImagePath} />
      <main>
        <Article
          title={title}
          desc={desc}
          date={date}
          category={category}
          tableOfContents={tableOfContents}
          disableToc={disableToc}
          html={html}
          tags={tags}
          buyMeACoffeeId={buyMeACoffeeId}
          previous={pageContext.previous}
          next={pageContext.next}
        ></Article>
        <CommentWrap>
          <Comment />
        </CommentWrap>
      </main>
    </Layout>
  );
};

const CommentWrap = styled.section`
  width: 100%;
  padding: 0 var(--padding-sm);
  margin: 0 auto;
  margin-bottom: var(--sizing-xl);

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    width: auto;
  }
`;

export const query = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        sponsor {
          buyMeACoffeeId
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents
      frontmatter {
        title
        desc
        thumbnail {
          childImageSharp {
            fixed {
              src
            }
          }
        }
        date(formatString: "YYYY-MM-DD")
        category
        disableToc
        tags
      }
    }
  }
`;
export default BlogPost;
