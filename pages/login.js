import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';

import Input from '../components/Input';
import Button from '../components/Button';
import { colors } from '../libs/metrics';
import Label from '../components/Label';
import { login, getUser } from '../libs/api';
import { Alert } from '../components/Alert';
import UserContext from '../context/UserContext';
import Container from '../components/Container';
import Loading from '../components/Loading';
import * as User from '../models/user';

type State = {
  nim: string,
  password: string,
  alertIsVisible: boolean,
  alertMessage: string,
  loading: boolean,
  initialLoading: boolean
};

export default class Login extends React.Component<any, State> {
  state = {
    nim: '',
    password: '',
    alertIsVisible: false,
    alertMessage: '',
    loading: false,
    initialLoading: true
  };

  componentDidMount() {
    const uid = localStorage.getItem('uid');
    if (uid) {
      Router.push('/home');
    }
    this.setState({ initialLoading: false });
  }

  login = async () => {
    this.setState(prev => {
      return { loading: !prev.loading };
    });
    try {
      const data = await login({
        nim: this.state.nim,
        password: this.state.password
      });
      if (data.ok) {
        const { nim } = data.bio;
        try {
          const uid = await User.getUserByNim(nim);
          console.log(uid);
          localStorage.setItem('uid', uid);
          this.context.setUid(uid);
          Router.push('/home');
        } catch (error) {
          this.setState({
            alertIsVisible: true,
            alertMessage: error.message,
            loading: false
          });
        }
      } else {
        this.setState({
          alertIsVisible: true,
          alertMessage: data.error,
          loading: false
        });
      }
    } catch (error) {}
  };

  render() {
    if (this.state.initialLoading)
      return (
        <Container>
          <h1 style={{ color: 'white' }}>Please wait...</h1>
        </Container>
      );
    return (
      <Container>
        <UserContext.Consumer>
          {context => {
            this.context = context;
          }}
        </UserContext.Consumer>
        <Alert
          visible={this.state.alertIsVisible}
          title="Perhatian"
          onClose={() =>
            this.setState({ alertIsVisible: false, alertMessage: '' })
          }
          content={() => <p>{this.state.alertMessage}</p>}
        />
        <Content>
          <h3>Login</h3>
          <Label>NIM</Label>
          <Input
            value={this.state.nim}
            onChange={e => this.setState({ nim: e.target.value })}
            type="text"
            placeholder="165xxxxxxxxxxxx"
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
          <Button disabled={this.state.loading} onClick={this.login}>
            <Loading loading={this.state.loading} />
            Login
          </Button>
        </Content>
      </Container>
    );
  }
}

const Content = styled.div`
  min-width: 256px;
  background-color: white;
  margin: 24px;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.12), 0 5px 10px rgba(0, 0, 0, 0.24);

  h3 {
    margin: 0 0 24px 0;
    text-align: center;
  }
`;
