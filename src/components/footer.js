import React from 'react';
import styled from 'styled-components';
import useSiteMetadata from 'hooks/useSiteMetadata';

const Copyright = styled.span`
font-size: var(--text-sm);
font-weight: var(--font-weight-regular);
color: var(--color-gray-6);
`;

const RepoLink = styled.a`
color: var(--color-blue);
&:hover {
  text-decoration: underline;
}
`;

const FooterWrapper = styled.footer`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: var(--footer-height);
  background-color: var(--color-gray-1);
`;

export default function Footer() {
  const site = useSiteMetadata();
  const { author } = site.siteMetadata;
  const copyrightStr = `Copyright © ${author}. Built with `;
  const repoName = 'sculove.github.io';
  const repoSrc = 'https://github.com/sculove/sculove.github.io';

  return (<FooterWrapper role="contentinfo">
    <Copyright aria-label="Copyright">
      {copyrightStr}
      <RepoLink href={repoSrc} target="__blank">
        {repoName}
      </RepoLink>
    </Copyright>
  </FooterWrapper>)
}
