import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from 'layout/layout';
import SEO from 'components/seo';
import Comment from 'components/comment';
import Post, { Divider } from 'components/post';
import SponsorButton from 'components/sponsorButton';
import Tags from 'components/tags';

const BlogPost = ({ data }) => {
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
  const sponsor = data?.site?.siteMetadata?.sponsor || {};
  const ogImagePath = thumbnail && thumbnail.childImageSharp.fixed.src;
  return (
    <Layout>
      <SEO title={title} description={desc} image={ogImagePath} />
      <main>
        <article>
          <OuterWrapper>
            <InnerWrapper>
              <Post
                title={title}
                desc={desc}
                date={date}
                category={category}
                tableOfContents={tableOfContents}
                disableToc={disableToc}
                html={html}
              ></Post>
              <Tags tags={tags} />
            </InnerWrapper>
          </OuterWrapper>
        </article>
        {!!sponsor?.buyMeACoffeeId && (
          <SponsorButton sponsorId={sponsor.buyMeACoffeeId} />
        )}
        <Divider />
        <CommentWrap>
          <Comment />
        </CommentWrap>
      </main>
    </Layout>
  );
};

const OuterWrapper = styled.div`
  margin-top: var(--sizing-xl);

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    margin-top: var(--sizing-lg);
  }
`;

const InnerWrapper = styled.div`
  width: var(--post-width);
  margin: 0 auto;
  padding-bottom: var(--sizing-lg);

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    width: 87.5%;
  }
`;

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
