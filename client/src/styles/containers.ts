import styled from "styled-components";
export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto;
`;

export const Container = styled.div`
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0px 20px 20px;
  max-width: 400px;
  gap: 0.5rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const ProfileContainer = styled.div`
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

export const NavBlock = styled.div`
  font-size: 16px;
  font-weight: 400;
`;
export const NavContainer = styled.div<{$isBurger?:boolean}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8rem;
  // @media (max-width: 689px) {
  //   flex-direction: row;
  //   align-items: center;
  //   gap: 1em;
  // }
  @media (max-width: 700px) {
    ${(props)=>(props.$isBurger ? `display: flex;` : `display: none;`) }
  }
`;
