import styled, { keyframes } from "styled-components";

export const StatisticContainer = styled.div`
font-size: 18px;
text-align: center;
color: #9333ea;
display: flex;
flex-direction: row;
gap: 3rem;
width: 50%;
justify-content: center;
align-items: flex-start;
@media (max-width: 720px){
  font-size: 2vmax;
  gap: 1rem;
}
@media (max-width: 440px){
  width: 80%;
}
`;
export const StatisticCircles = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 1rem;
width: 50%;
`;

const progress = keyframes`
0% {
  stroke-dasharray: 0 100;
}
`

export const SingleChart = styled.div`
width: 100%;
`

export const CircularChart = styled.svg`
display: block;
`

export const CircleBg = styled.path`
fill: none;
stroke: #eee;
stroke-width: 3.8;
`
export const Circle = styled.path`
fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  stroke: #8687E7;
  animation: ${progress} 1s ease-out forwards;
`
export const Percantage = styled.text`
fill: #666;
font-family: sans-serif;
font-size: 0.5em;
text-anchor: middle;
`

