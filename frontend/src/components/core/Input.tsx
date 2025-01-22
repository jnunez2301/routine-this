import styled from "styled-components";

export const TextInput = styled.input<{$invalid?: boolean}>`
  padding: 10px 15px;
  border-radius: 0.3rem;
  outline: none;
  border: 1px solid ${(props) => (props.$invalid ? "red" : "rgba(0,0,0,0.2)")};
  transition: all 0.3s ease-in;
  &:focus-visible {
    border: 1px solid ${(props) => (props.$invalid ? "red" : "rgba(0,0,0,0.6)")};
  }
`;
