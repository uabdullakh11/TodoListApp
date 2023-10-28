import styled from "styled-components";
import Image from "next/image";
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
export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;
export const AvatarImage = styled(Image)`
  border-radius: 50%;
`
export const AvatarForm= styled.form`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
  margin: 0;
  max-width: 400px;
  gap: 0.5rem;
`;