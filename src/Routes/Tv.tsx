import React from "react";
import styled from "styled-components";
import { getOnTheAirTV, getPopularTV, getTopRatedTV } from "../api";
import Slider from "../Components/Slider";

const Wrapper = styled.div`
  background: black;
`;
const CategoryTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-weight: 600;
  font-size: 20px;
  position: relative;
  top: -100px;
`;

const SliderWrapper = styled.div`
  height: 35vh;
  padding-top: 170px;
`;

function Tv() {
  return (
    <Wrapper>
      <SliderWrapper>
        <CategoryTitle>Popular</CategoryTitle>
        <Slider getData={getPopularTV} id="popularTV" />
      </SliderWrapper>
      <SliderWrapper>
        <CategoryTitle>Top Rated</CategoryTitle>
        <Slider getData={getTopRatedTV} id="top_ratedTV" />
      </SliderWrapper>
      <SliderWrapper>
        <CategoryTitle>On The Air</CategoryTitle>
        <Slider getData={getOnTheAirTV} id="on_the_airTV" />
      </SliderWrapper>
    </Wrapper>
  );
}

export default Tv;
