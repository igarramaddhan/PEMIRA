import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from '../../libs/metrics';
import Modal from '../../components/Modal';
import Candidate from '../../components/dashboard/Candidate';
import {
  getCandidates,
  getTotal,
  getCandidate,
  getTotalPemilih
} from '../../libs/api';
import List from '../../components/List';

type Props = {};
type State = {};

export default class Dashboard extends Component<Props, State> {
  static async getInitialProps(props) {
    const candidates = await getCandidates();
    return { candidates };
  }

  state = {
    alertIsVisible: false,
    alertMessage: '',
    totalFaculty: 0,
    total: 0,
    allFaculty: 0
  };

  async componentDidMount() {
    const y = await getCandidate(this.props.candidates[0].id, val => {
      const total = val.total;
      getTotal('FILKOM', data =>
        this.setState({ totalFaculty: data.total, total: total })
      );
    });
    const x = await getTotalPemilih(val => {
      this.setState({ allFaculty: val });
    });
  }

  render() {
    console.log('Fakultas: ', this.state.totalFaculty / this.state.total);
    console.log('Universitas: ', this.state.total / this.state.allFaculty);
    return (
      <Container>
        <Modal
          visible={this.state.alertIsVisible}
          title="Tambah calon"
          onClose={() =>
            this.setState({ alertIsVisible: false, alertMessage: '' })
          }
          content={() => <Candidate />}
        />
        <Header>
          <div className="button active">Kandidat</div>
          <div className="button">Grafik</div>
        </Header>
        <Content>
          <List
            items={this.props.candidates}
            renderItem={val => <p key={val.id}>{val.nama}</p>}
          />
          <FAB onClick={() => this.setState({ alertIsVisible: true })}>+</FAB>
        </Content>
      </Container>
    );
  }
}

const Container = styled.div`
  flex: 1;
  display: flex;
  padding: 8px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    ${colors.gradient.primary},
    ${colors.gradient.secondary}
  );
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 8px;
  width: calc(100% - 24px);
  background-color: white;

  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  .button {
    text-align: center;
    flex: 1;
    padding: 16px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: #f2f2f2;
      color: ${colors.blue};
      font-weight: bold;
    }

    &.active {
      background: ${colors.blue};
      color: white;
      font-weight: bold;
    }
  }
`;

const Content = styled.div`
  width: calc(100% - 56px);
  flex: 1;
  background-color: white;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  h3 {
    margin: 0 0 24px 0;
    text-align: center;
  }
`;

const FAB = styled.div`
  cursor: pointer;
  width: 70px;
  height: 70px;
  background-color: ${colors.blue};
  border-radius: 50%;
  box-shadow: 0 2px 8px 0 #666;

  font-size: 50px;
  line-height: 70px;
  color: white;
  text-align: center;

  position: fixed;
  right: 50px;
  bottom: 50px;

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: ${colors.darkBlue};
    box-shadow: 0 3px 7px 0 #666;
    transform: scale(1.05);
  }
`;
