import React from 'react';
import { rhythm } from 'styles/typography';
import Markdown from 'styles/markdown';
import styled from 'styled-components';
import Category from 'styles/category';
import DateTime from 'styles/dateTime';
import TableOfContents from 'components/tableOfContents';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

const Info = styled.div`
  margin-bottom: var(--sizing-md);
`;
const PostCategory = styled(Category)`
  font-size: 1.5rem;
  font-weight: var(--font-weight-semi-bold);
  & a {
    color: var(--color-blue) !important;
  }
`;

const Time = styled(DateTime)`
  display: block;
  margin-top: var(--sizing-xs);
`;

const Desc = styled.p`
  margin-top: var(--sizing-lg);
  line-height: 1.5;
  font-size: var(--text-lg);

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    line-height: 1.31579;
    font-size: 1.1875rem;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--color-gray-3);
  margin-top: var(--sizing-lg);
  margin-bottom: var(--sizing-lg);
`;

const Title = styled.h1`
  font-weight: var(--font-weight-bold);
  line-height: 1.1875;
  font-size: var(--text-xl);

  @media (max-width: ${({ theme }) => theme.device.md}) {
    line-height: 1.21875;
    font-size: 2.5rem;
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    line-height: 1.21875;
    font-size: 2rem;
  }
`;

export default function Post({
  title,
  category,
  date,
  desc,
  html,
  tableOfContents,
  disableToc,
}) {
  return (
    <div>
      {!disableToc && <TableOfContents tableOfContents={tableOfContents} />}
      <header>
        <Info>
          <PostCategory>
            <Link to={`/category/${kebabCase(category)}/`}>{category}</Link>
          </PostCategory>
          <Time dateTime={date}>{date}</Time>
        </Info>
        <Title>{title}</Title>
        {desc && <Desc>{desc}</Desc>}
      </header>
      <Divider />
      <Markdown dangerouslySetInnerHTML={{ __html: html }} rhythm={rhythm} />
    </div>
  );
}
