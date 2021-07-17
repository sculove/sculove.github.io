import React from "react";
import { Link } from 'gatsby';
import styled from "styled-components";
export default function PostNavigator({ previous, next }) {
  return (
    <PostNavigatorWapper>
      <li>
        {previous && (
          <Link to={previous.fields.slug} rel="prev">
            ← {previous.frontmatter.title}
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link to={next.fields.slug} rel="next">
            {next.frontmatter.title} →
          </Link>
        )}
      </li>
    </PostNavigatorWapper>
  )
}

const PostNavigatorWapper = styled.ul`{
  margin: 40px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 12px;
  }

  a {
    padding: 7px 16px 8px 16px;
    border-radius: 6px;
    font-weight: bold;
    color: var(--color-blue);
    font-size: 0.9em;
    opacity: 0.8;
  }
}`
