import styled, { css } from "styled-components";

const Input = styled.input<{ hasError?: boolean }>`
  ${(props) =>
    props.hasError &&
    css`
      border: 1px solid red;
    `}
`;
export default Input;
