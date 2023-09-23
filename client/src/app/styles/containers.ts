import styled from'styled-components';
export const ModalContainer = styled.div`
  padding-botttom: 10px;
  border-radius: 10px;
  background: #fff;
  @media (max-width: 400px) {
    max-width: 320px;
  }
`;
export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto;
`;
export const SortingButtonsContainer = styled.div`
  background-color: #9333ea0f;
  border-radius: 10px;
`;
export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8rem;
  @media (max-width: 689px) {
    flex-direction: row;
    align-items: center;
    gap: 1em;
  }
`;
export const SortingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  @media (max-width: 689px) {
    flex-direction: row;
    align-items: center;
  }
  @media (max-width: 360px) {
    gap: 0;
   }
`;
export const TaskContainer = styled.div`
  padding: 10px 10px;
  border-radius: 10px;
  display: flex;
  background-color: #9333ea0f;
  flex-direction: row;
  justify-content: space-between;
  // gap: 4em;
  @media (max-width: 420px){
    font-size: 14px;
  }
`; 
export const Container = styled.div`
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const EmptyContainer = styled.h2`
  text-align: center;
`;
export const PaginationList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  gap: 1em;
`;