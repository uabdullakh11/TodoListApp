import styled from "styled-components";
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

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

export const StatisticContainer = styled.div`
  font-size: 18px;
  text-align: center;
  color: #9333ea;
  display: flex;
  flex-direction: row;
  gap: 3rem;
`;
export const ThisWeek = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const AllTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

export const AccountPageForm = styled(Form)`
  margin: 0;
`;
export const UserLoginContainer = styled.div`
  max-width: 220px;
  display: flex;
`;
export const UserEmailContainer = styled.div`
  max-width: 220px;
  display: flex;
`;
