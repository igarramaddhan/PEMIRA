import styled from 'styled-components';
import { colors } from '../libs/metrics';

export default () => (
  <Container>
    <Content>
      <h2>Pemilihan akan dilaksanakan pada</h2>
      <h1>21 Desember 2019</h1>
    </Content>
  </Container>
);

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    ${colors.gradient.primary},
    ${colors.gradient.secondary}
  );
`;

const Content = styled.div`
  min-width: 256px;
  background-color: white;
  margin: 24px;
  padding: 56px;
  border-radius: 5px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.12), 0 5px 10px rgba(0, 0, 0, 0.24);

  h2,
  h1 {
    text-align: center;
  }
`;
