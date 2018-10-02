import React from 'react';
import Router from 'next/router';
import Container from './Container';
import { getUserByUId } from '../libs/api';

export default function withUser(Component: any) {
  return class HOC extends React.Component {
    state = {
      loading: true,
      uid: null,
      user: null
    };
    static async getInitialProps(props) {
      let pageProps = {};

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(props);
      }

      return { pageProps };
    }

    async componentDidMount() {
      const uid = localStorage.getItem('uid');
      if (uid === null) {
        Router.replace('/login');
      } else {
        const user = await getUserByUId(uid, user => {
          this.setState({ uid, user, loading: false });
        });
      }
    }

    render() {
      if (this.state.loading)
        return (
          <Container>
            <h1 style={{ color: 'white' }}>Please wait...</h1>
          </Container>
        );
      return (
        <Component
          uid={this.state.uid}
          user={this.state.user}
          {...this.props.pageProps}
        />
      );
    }
  };
}
