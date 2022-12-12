import styled from "styled-components";

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 100%;

  @media only screen and (min-width: 1440px) {
    width: 90%;
  }
`;

const Container = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Container;
