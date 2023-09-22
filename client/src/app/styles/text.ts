import styled from'styled-components';
export const ModalText = styled.p`
  color: #9333ea;
  font-weight: bold;
  margin: 0;
`;
export const LogoTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  color: #9333ea;
`;
export const Username = styled.div`
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  color: #9333ea;
`;
export const TaskName = styled.span`
  color: #000000;
`;
export const DataLine = styled.span`
  color: #6b7280;
`;
export const ErrorCaption = styled.span`
color:#F56497;
background-color: #F564970F;
`;
export const PaginationItem = styled.li`cursor: pointer;`;
export const PaginationLink = styled.a<{$active: boolean}>`
${(props) =>
  props.$active ?`font-weight: 700;` : ``}
`;
// export const PaginationLink = styled.a``;