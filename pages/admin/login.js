import React from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { colors } from '../../libs/metrics';
import Label from '../../components/Label';

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
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  h3 {
    margin: 0 0 24px 0;
    text-align: center;
  }
`;

type State = {
  email: string,
  password: string
};

export default class Login extends React.Component<any, State> {
  state = {
    email: '',
    password: ''
  };

  login = () => {
    console.log('login');
  };

  render = () => (
    <Container>
      <Content>
        <h3>Login Admin</h3>
        <Label>Username</Label>
        <Input
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
          type="text"
          placeholder="exaple.user"
          onKeyDown={key => {
            if (key.key === 'Enter') {
              const x = document.getElementById('pass');
              x.focus();
            }
          }}
        />
        <br />
        <br />
        <Label>Password</Label>
        <Input
          id="pass"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
          type="password"
          placeholder="password"
          onKeyDown={key => {
            if (key.key === 'Enter') {
              const x = document.getElementById('pass');
              x.blur();
              this.login();
            }
          }}
        />
        <br />
        <br />
        <Button onClick={this.login}>Login</Button>
      </Content>
    </Container>
  );
}
