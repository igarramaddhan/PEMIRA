import React, { Component } from 'react';
import Router from 'next/router';
import withUser from '../components/withUser';
import List from '../components/List';
import Card from '../components/Card';
import { getCandidates, vote } from '../libs/api';
import styled from 'styled-components';
import { colors } from '../libs/metrics';
import Container from '../components/Container';
import RC2 from 'react-chartjs2';

type Props = {
  uid: string
};
type State = {};

class Home extends Component<Props, State> {
  static async getInitialProps(props) {
    try {
      const candidates = await getCandidates();
      return { candidates };
    } catch (error) {
      console.log(error);
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      user: props.user
    };
  }

  state = {
    user: null
  };

  render() {
    console.log(this.state);
    return (
      <Container>
        <Content>
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexWrap: 'wrap',
              justifyContent: 'center',
              overflowY: 'scroll'
            }}
          >
            {/* <RC2
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July'
                ],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                  }
                ]
              }}
              // options={chartOptions}
              type="bar"
            /> */}
            {this.props.candidates.map(val => (
              <Card
                disabled={this.props.user.voted}
                title={val.nama}
                key={val.id}
                vote={() => vote(this.props.uid, val.id)}
              />
            ))}
          </div>
        </Content>
      </Container>
    );
  }
}

const Content = styled.div`
  width: calc(100% - 56px);
  flex: 1;
  height: 0;
  max-height: calc(100% - 56px);
  display: flex;
  background-color: #f2f2f2;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  h3 {
    margin: 0 0 24px 0;
    text-align: center;
  }
`;

type WrapperProps = {
  uid: string
};

export default withUser(Home);

// export default class Wrapper extends Component {
//   static async getInitialProps(props) {
//     try {
//       const candidates = await getCandidates();
//       console.log(candidates);
//       return { candidates };
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   render() {
//     return withUser(Home);
//   }
// }
