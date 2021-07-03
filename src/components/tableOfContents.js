import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';

const Toc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: fixed;
  width: 300px;
  margin-top: 20px;
  right: 5px;
  border-left-width: 5px;
  border-left-style: solid;
  padding-left: 10px;
  font-size: 14px;

  & a.toc_current {
    color: var(--color-text);
    font-weight: bold;
  }

  & ul {
    cursor: pointer;
    list-style-type: none;
  }

  & ul li {
    margin-bottom: 10px;
  }

  & ul li a {
    color: var(--color-text-3);
    margin-bottom: 0;
  }

  @media (max-width: 1300px) {
    display: none;
  }
`;

export default function TableOfContents({ tableOfContents }) {
  const [currentHeaderUrl, setCurrentHeaderUrl] = useState(undefined);
  const createTableOfContents = useMemo(() => {
    if (currentHeaderUrl) {
      return tableOfContents.replace(
        `"${currentHeaderUrl}"`,
        `"${currentHeaderUrl}" class="toc_current"`
      );
    } else {
      return tableOfContents;
    }
  }, [currentHeaderUrl]);

  useEffect(() => {
    const HEADER_OFFSET_Y = window.innerHeight / 3;
    const handleScroll = () => {
      let aboveHeaderUrl;
      const currentOffsetY = window.pageYOffset;
      const headerElements = document.querySelectorAll('.anchor-header');
      for (const elem of headerElements) {
        const { top } = elem.getBoundingClientRect();
        const elemTop = top + currentOffsetY;
        const isLast = elem === headerElements[headerElements.length - 1];
        if (currentOffsetY < elemTop - HEADER_OFFSET_Y) {
          aboveHeaderUrl &&
            setCurrentHeaderUrl(aboveHeaderUrl.split(location.origin)[1]);
          !aboveHeaderUrl && setCurrentHeaderUrl(undefined);
          break;
        } else {
          isLast && setCurrentHeaderUrl(elem.href.split(location.origin)[1]);
          !isLast && (aboveHeaderUrl = elem.href);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Toc>
      <div dangerouslySetInnerHTML={{ __html: createTableOfContents }} />
    </Toc>
  );
}
