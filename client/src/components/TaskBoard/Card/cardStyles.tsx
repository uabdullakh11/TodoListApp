import styled from "styled-components";
export const CardBlock = styled.div`
  background-color: #f4f4f4;
  border-radius: 10px;
  /* width: 500px; */
  max-width: 600px;
  height: 640px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* width: 70%; */
  /* @media (max-width: 340px) {
    width: 260px;
  } */
`;
export const EmptyContainer = styled.h2`
  text-align: center;
`;
export const CardHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 15px 0px 5px;
`
export const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 20px;
`