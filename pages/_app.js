import React from 'react';
import App from 'next/app';
import Link from 'next/link';
import NProgress from 'nprogress';
import Router from 'next/router';
import styled from 'styled-components';
import UserContext from '../context/UserContext';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  state = {
    uid: null
  };

  async componentDidMount() {
    Router.onRouteChangeStart = url => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    Router.onRouteChangeComplete = () => {
      NProgress.done();
      window.scrollTo(0, 0);
    };
    Router.onRouteChangeError = () => NProgress.done();
    NProgress.configure({ showSpinner: false });
  }

  setUid = (uid: string) => {
    this.setState({ uid });
  };

  clearUid = () => {
    this.setState({ uid: null });
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <div
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <UserContext.Provider
          value={{
            uid: this.state.uid,
            clearUid: this.clearUid,
            setUid: this.setUid
          }}
        >
          <Container>
            <Component {...pageProps} />
          </Container>
        </UserContext.Provider>
      </div>
    );
  }
}

const Container = styled.div`
  flex: 1;
  display: flex;
  min-height: 100%;
  position: relative;
  overflow-x: hidden;
  font-family: 'Raleway', sans-serif;
  background-color: #f2f2f2;
`;
