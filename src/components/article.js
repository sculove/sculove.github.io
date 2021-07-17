import React from "react";
import styled from 'styled-components';
import Post, {Divider} from 'components/post';
import Tags from 'components/tags';
import SponsorButton from 'components/sponsorButton';
import PostNavigator from 'components/postNavigator';

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
export default function Article({title, desc, date, category, tableOfContents, disableToc, html, tags, buyMeACoffeeId, previous, next}) {
  return (
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
      {!!buyMeACoffeeId && (
        <SponsorButton sponsorId={buyMeACoffeeId} />
      )}
      <Divider />
      <PostNavigator previous={previous} next={next}/>
      <Divider />
    </article>
  )
}