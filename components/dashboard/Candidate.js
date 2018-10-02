import React, { Component } from 'react';
import Label from '../../components/Label';
import Input from '../../components/Input';
import styled from 'styled-components';
import Button from '../Button';
import { addCandidate } from '../../libs/api';
import { Alert } from '../Alert';

type Props = {};
type State = {};

export default class Candidate extends Component<Props, State> {
  state = {
    nama: '',
    alertIsVisible: false,
    alertMessage: ''
  };

  addCandidate = async () => {
    await addCandidate(this.state.nama);
    this.setState({
      alertIsVisible: true,
      alertMessage: 'Tambah kandidat berhasil'
    });
  };

  render() {
    return (
      <Container>
        <Alert
          visible={this.state.alertIsVisible}
          title="Perhatian"
          onClose={() =>
            this.setState({ alertIsVisible: false, alertMessage: '', nama: '' })
          }
          content={() => <p>{this.state.alertMessage}</p>}
        />
        <div className="content">
          <div className="image">Image</div>
          <div className="form">
            <Label>Nama</Label>
            <Input
              id="nama"
              value={this.state.nama}
              onChange={e => this.setState({ nama: e.target.value })}
              type="text"
              placeholder="eg., John Cena"
              onKeyDown={key => {
                if (key.key === 'Enter') {
                  const x = document.getElementById('nama');
                  x.blur();
                }
              }}
            />
            <br />
            <br />
          </div>
        </div>
        <div>
          <Button onClick={this.addCandidate}>Tambah</Button>
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  .content {
    flex: 1;
    padding: 16px;
    display: flex;

    .image {
      flex: 1;
      display: flex;
      margin: 8px;
      background: #f2f2f2;
      justify-content: center;
      align-items: center;
    }
    .form {
      flex: 2;
    }
  }

  .bottom {
  }
`;
