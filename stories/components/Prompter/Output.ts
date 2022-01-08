import styled from 'styled-components';
import { Typography } from '@mui/material';

export default styled(Typography)`
  && {
    margin-top: ${({ theme }) => theme.spacing(2)};
  }
`;
