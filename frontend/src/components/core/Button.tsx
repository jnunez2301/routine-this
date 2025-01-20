import styled, { css } from "styled-components";

const buttonBaseStyles = css`
  padding: 10px 15px;
  height: 40px;
  font-weight: bold;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
`;

const variantStyles = {
  primary: css`
    background-color: var(--palette-500);
    color: var(--palette-50);
    &:hover {
      background-color: var(--palette-600);
    }
  `,
  secondary: css`
    background-color: var(--palette-200);
    color: var(--palette-700);
    &:hover {
      background-color: var(--palette-400);
    }
  `,
  danger: css`
    background-color: var(--palette-800);
    color: var(--palette-50);
    &:hover {
      background-color: var(--palette-700);
    }
  `,
  outlined: css`
    background-color: transparent;
    color: var(--palette-950);
    outline: 1px solid var(--palette-200);
    &:hover {
      background-color: var(--palette-50);
      outline: 1px solid var(--palette-600);
    }
  `,
  transparent: css`
    background-color: transparent;
    color: var(--palette-950);
    &:hover {
      background-color: var(--palette-50);
      outline: 1px solid var(--palette-600);
    }
  `,
};

export const Button = styled.button<{ $variant: "primary" | "secondary" | "danger" | "outlined" | "transparent" }>`
  ${buttonBaseStyles}
  ${({ $variant }) => variantStyles[$variant]}
`;
