import styled from 'styled-components';
import Link from 'next/link';
import { colors } from '../libs/metrics';
import Router from 'next/router';
import Button from '../components/Button';

export default () => (
  <DIV>
    <div className="content">
      <h1>Selamat datang di Pemilihan Mahasiswa Raya</h1>
      <p style={{ fontSize: '18px' }}>Silahkan melakukan login/register</p>
      <div className="buttons">
        <div className="button">
          <Button onClick={() => Router.push('/login')}>Login</Button>
        </div>
        <div className="button">
          <Button onClick={() => Router.push('/register')}>Register</Button>
        </div>
      </div>
    </div>
  </DIV>
);

const DIV = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-family: 'Raleway', sans-serif;
  text-align: center;

  h1 {
    margin: 0;
  }

  background: linear-gradient(
    ${colors.gradient.primary},
    ${colors.gradient.secondary}
  );

  .content {
    display: flex;
    padding: 40px 56px;
    border-radius: 5px;
    flex-direction: column;
    background: white;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.12), 0 5px 10px rgba(0, 0, 0, 0.24);

    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;

      .button {
        padding: 8px;
        flex: 1;
      }
    }
  }
`;
