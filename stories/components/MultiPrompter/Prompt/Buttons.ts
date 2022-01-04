import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: ${({ theme }) => theme.spacing(1)};
  place-items: center end;
`;
