import styled, { css } from 'styled-components';
import Modal from '@mui/material/Modal';

const visibleStyles = css`
  visibility: visible;
  opacity: 1;
`;

const hiddenStyles = css`
  visibility: hidden;
  opacity: 0;
`;

export default styled.div<{ visible: boolean }>`
  display: block;
  float: left;
  margin-top: ${({ theme }) => theme.spacing(2)};
  transition: all 0.3s ease;

  ${({ visible }) => (visible ? visibleStyles : hiddenStyles)}
`;
