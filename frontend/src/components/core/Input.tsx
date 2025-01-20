import styled from "styled-components";

export const TextInput = styled.input`
  padding: 10px 15px;
  border-radius: .3rem;
  outline: none;
  border: 1px solid rgba(0,0,0,0.2);
  transition: all .3s ease-in;
  &:focus-visible{
    border: 1px solid rgba(0,0,0,0.6);
  }
`;
