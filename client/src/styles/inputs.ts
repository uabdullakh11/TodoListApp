import styled from "styled-components";
export const Input = styled.input`
  color: #6b7280;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: #f3f3f3;
  text-indent: 0.5em;
  padding: 5px 0px;
  width: 100%;
`;

const ChangeInput = styled.input`
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: #f3f3f3;
  text-align: center;
  padding: 5px 0px;
  width: 16vmin;
`;

export const UserNameInput = styled(ChangeInput)`
  color: #404040;
  font-size: 18px;
  font-weight: 700;
`;
export const EmailInput = styled(ChangeInput)`
  color: #6b7280;
`;
export const Label = styled.label`
  position: relative;
  display: inline-block;
`;
export const FileInput = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
  display: block;
  width: 0;
  height: 0;
`;