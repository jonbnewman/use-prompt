import styled, { css } from 'styled-components';

const visibleStyles = css`
  transform: scale(1);
  transition: all 0.3s ease;
`;

export default styled.div<{ visible: boolean }>`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing(2)};
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: ${({ theme }) => theme.spacing(2)};

  transform-origin: 50% 50%;
  transform: scale(0.9);
  transition: all 0.2s ease;
  ${({ visible }) => visible && visibleStyles}
`;
