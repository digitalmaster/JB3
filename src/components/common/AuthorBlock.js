import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { StaticImage } from 'gatsby-plugin-image';

const Wrapper = styled.div`
  display: flex;
  padding: 2rem;
  margin-top: 20px;
  margin-bottom: 100px;
  border-radius: 5px;
  border: 1px solid rgba(11, 99, 167, 0.1);

  box-shadow: 0 1.2px 1px rgba(0, 93, 148, 0.009),
    0 3px 2.6px rgba(0, 93, 148, 0.013), 0 6.2px 5.3px rgba(0, 93, 148, 0.017),
    0 12.8px 11px rgba(0, 93, 148, 0.021), 0 35px 30px rgba(0, 93, 148, 0.03);

  align-items: stretch;

  @media (min-width: 735px) {
    align-items: center;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
`;

const Right = styled.div`
  padding: 2rem;
  padding-top: 0;
  flex: 4;
  font-size: 1.5rem;

  @media (min-width: 420px) {
    align-items: stretch;
  }

  @media (min-width: 735px) {
    padding-top: 2rem;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 9px;
`;

const P = styled.div`
  line-height: 1.4;
  opacity: 0.8;
`;

const Component = () => (
  <Wrapper>
    <ImageWrapper>
      <StaticImage
        src="../../images/logo-circle.png"
        alt="JB Logo"
        width="200"
      />
    </ImageWrapper>
    <Right>
      <Title>Senior Software Engineer @ CircleCI</Title>
      <P>
        Application Developer • Team Lead • Designer • Instructor • Writer •
        Formerly @Postmates &amp; @Sosh • Generally an optimist. <br />
        <br /> Reach me{' '}
        <a
          href="https://twitter.com/JoseBrowneX"
          target="_blank"
          rel="noopener noreferrer"
        >
          @JoseBrowneX
        </a>
      </P>
    </Right>
  </Wrapper>
);

Component.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Component;
