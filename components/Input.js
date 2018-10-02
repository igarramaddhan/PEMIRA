import styled from 'styled-components';

export default styled.input`
  width: calc(100% - 20px);
  padding: 8px;
  border: 2px solid #f2f2f2;
  border-radius: 5px;
  background-color: ${props => (props.value !== '' ? '#ffff' : '#f2f2f2')};
  &:focus {
    background-color: #ffff;
  }
  &.error {
    border: 2px solid red;
    outline: none;
  }
`;
