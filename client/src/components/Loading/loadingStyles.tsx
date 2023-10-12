import styled, { keyframes } from "styled-components";
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem;
`;

const dualring = keyframes`
to {
  transform: rotate(360deg);
}
`;

export const LoadingRing = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  &::after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #9333ea;
    border-color: #9333ea transparent #9333ea transparent;
    -webkit-animation: lds-dual-ring 1.2s linear infinite;
    animation: ${dualring} 1.2s linear infinite;
  }
 
`;
