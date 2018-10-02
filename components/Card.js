import styled from 'styled-components';
import Button from './Button';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 256px;
  min-height: 384px;
  background: white;
  border-radius: 5px;
  padding: 16px;
  margin: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
export default ({
  title,
  disabled = false,
  vote
}: {
  title: string,
  disabled: boolean,
  vote: void
}) => (
  <CardContainer>
    <h3>{title}</h3>
    <div style={{ flex: 1 }}>Content</div>
    <div>
      <Button disabled={disabled} onClick={vote}>
        Vote
      </Button>
      <Button disabled={disabled} onClick={() => {}}>
        Detail
      </Button>
    </div>
  </CardContainer>
);
