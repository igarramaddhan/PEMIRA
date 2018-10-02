import styled, { keyframes } from 'styled-components';
import { colors } from '../libs/metrics';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Loading = styled.div`
  transition: 0.1s ease-in-out;
  margin-right: 0;
  border-radius: 50%;
  &.loading {
    margin-right: 10px;
    border: 3px solid ${colors.orange};
    border-top: 3px solid transparent; /* Blue */
    width: 15px;
    height: 15px;
    animation: ${spin} 2s linear infinite;
  }
`;

export default ({ loading }: { loading: boolean }) => (
  <Loading className={loading ? 'loading' : ''} />
);
