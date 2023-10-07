import styled from "styled-components";
import Image from "next/image";

const InOutBtn = styled.button`
  border-radius: 5px;
  border: none;
  color: #9333ea;
  padding: 10px 70px;
  margin-top: 40px;
  cursor: pointer;
`;
export const AuthButton = styled(InOutBtn)`
  background: url("../auth-btn-icon.svg"), #9333ea0f;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 40px;
  background-size: 30px;
`;

export const EditButton = styled(Image)`
  cursor: pointer;
`;


