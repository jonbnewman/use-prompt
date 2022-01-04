import styled from 'styled-components';
import Paper from '@mui/material/Paper';

export default styled(Paper)`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
`;
