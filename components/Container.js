import styled from 'styled-components';
import { colors } from '../libs/metrics';

export default styled.div`
  flex: 1;
  display: flex;
  padding: 8px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    ${colors.gradient.primary},
    ${colors.gradient.secondary}
  );
`;
