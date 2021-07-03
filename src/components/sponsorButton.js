import React from 'react';
import styled from 'styled-components';

const SponsorWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;

  & a {
    display: inline-block;
    padding: 0px 7px;
    width: 140px;
    height: 33px;
    text-decoration: none;
    background-color: #f7d501;
    border: 1px solid transparent;
    border-radius: 6px;
    letter-spacing: -0.08px;
    box-sizing: border-box;
    font-size: 12px;
    font-weight: bold;
    line-height: 30px;
    text-align: left;

    & img {
      width: 20px;
      margin-bottom: 1px;
      box-shadow: none;
      border: none;
      vertical-align: middle;
    }

    & span {
      color: var(--color-black);
      margin-left: 6px;
    }
  }
`;

const SponsorButton = ({ sponsorId }) => (
  <SponsorWrapper>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`https://www.buymeacoffee.com/${sponsorId}`}
    >
      <img
        src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg"
        alt="Buy me a coffee"
      />
      <span>Buy me a coffee</span>
    </a>
  </SponsorWrapper>
);

export default SponsorButton;
