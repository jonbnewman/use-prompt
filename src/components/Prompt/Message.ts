import styled from 'styled-components';
import { Typography } from '@mui/material';

export default styled(Typography)`
  && {
    padding: ${({ theme }) => theme.spacing(2)};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    border: ${({ theme }) => `1px solid ${theme.palette.divider}`};
  }
`;
