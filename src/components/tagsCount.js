import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

const TagCountWrapper = styled.div`
  margin: 10px 0px 20px 0;
`;

export const TagButton = styled(Link)`
  cursor: pointer;
  display: inline-block;
  margin: 0 3px 6px 3px;
  background-color: var(--color-floating-button);
  padding: 5px 5px;
  border-radius: var(--border-radius-base);
  font-size: 0.7rem;
  font-weight: var(--font-weight-semi-bold);

  :focus {
    outline: none;
  }

  &:hover {
    color: var(--color-floating-button-text-hover);
    background-color: var(--color-floating-button-hover);
  }

  &:focus-visible {
    color: var(--color-floating-button-text-hover);
    background-color: var(--color-floating-button-hover);
  }
`;
export default function TagsCount({ tags = [] }) {
  return (
    <TagCountWrapper>
      {tags?.map((tag) => (
        <TagButton
          key={`tagCount-${tag.name}`}
          to={`/tag/${kebabCase(tag.name)}`}
        >
          {tag.name}
          <span>{tag.count}</span>
        </TagButton>
      ))}
    </TagCountWrapper>
  );
}
