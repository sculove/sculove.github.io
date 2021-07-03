import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

export const TagButton = styled(Link)`
  cursor: pointer;
  display: inline-block;
  margin: 0 5px 10px 5px;
  background-color: var(--color-category-button);
  padding: var(--sizing-sm) var(--sizing-base);
  border-radius: var(--border-radius-base);
  font-size: 0.875rem;
  font-weight: var(--font-weight-semi-bold);

  :focus {
    outline: none;
  }

  &:hover {
    color: var(--color-white);
    background-color: var(--color-blue);
  }

  &:focus-visible {
    color: var(--color-white);
    background-color: var(--color-blue);
  }
`;

export default function Tags({ tags }) {
  return (
    <div>
      {tags?.map((tag) => (
        <TagButton key={`tag-${tag}`} to={`/tag/${kebabCase(tag)}`}>
          {tag}
        </TagButton>
      ))}
    </div>
  );
}
