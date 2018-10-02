import React, { Component } from 'react';
import Router from 'next/router';
import styled from 'styled-components';

import Input from '../components/Input';
import { colors } from '../libs/metrics';
import Label from '../components/Label';
import Button from '../components/Button';
import { register } from '../libs/api';
import { Alert } from '../components/Alert';
import Container from '../components/Container';
import Loading from '../components/Loading';
import Dropdown from '../components/Dropdown';

type Props = {};
type State = {
  nim: string,
  nama: string,
  fakultas: string,
  alertIsVisible: boolean,
  alertMessage: string,
  loading: boolean
};

export default class Register extends Component<Props, State> {
  state = {
    nim: '',
    nama: '',
    fakultas: '',
    alertIsVisible: false,
    alertMessage: '',
    loading: false
  };

  validate = () => {
    const { nim, nama, fakultas } = this.state;
    this.setState({ loading: true });
    return (
      nim.length === 15 &&
      nim.charAt(0) == 1 &&
      nama.length > 0 &&
      fakultas.length > 0
    );
  };

  register = async () => {
    if (this.validate()) {
      const { nim, nama, fakultas } = this.state;
      const isSucces = await register(nim, nama, fakultas);
      if (isSucces) {
        this.setState({
          alertMessage: 'Registrasi Berhasil!',
          alertIsVisible: true,
          loading: false
        });
        setTimeout(() => Router.push('/announcement'), 3000);
      } else {
        this.setState({
          alertMessage: 'NIM sudah terdaftar!',
          alertIsVisible: true,
          loading: false
        });
      }
    } else {
      this.setState({
        alertIsVisible: true,
        alertMessage: 'Silahkan isi seluruh form yang tersedia!',
        loading: false
      });
    }
  };

  handleChange = val => {
    console.log(val);
    this.setState({ fakultas: val });
  };

  render() {
    return (
      <Container>
        <Alert
          visible={this.state.alertIsVisible}
          title="Perhatian"
          onClose={() =>
            this.setState({ alertIsVisible: false, alertMessage: '' })
          }
          content={() => <p>{this.state.alertMessage}</p>}
        />
        <Content>
          <h3>Register</h3>
          <Label>NIM</Label>
          <Input
            value={this.state.nim}
            onChange={e => this.setState({ nim: e.target.value })}
            type="text"
            placeholder="eg., 165xxxxxxxxxxxx"
            onKeyDown={key => {
              if (key.key === 'Enter') {
                const x = document.getElementById('nama');
                x.focus();
              }
            }}
          />
          <br />
          <br />
          <Label>Nama</Label>
          <Input
            id="nama"
            value={this.state.nama}
            onChange={e => this.setState({ nama: e.target.value })}
            type="text"
            placeholder="eg., John Cena"
            onKeyDown={key => {
              if (key.key === 'Enter') {
                const x = document.getElementById('fakultas');
                x.focus();
              }
            }}
          />
          <br />
          <br />
          <Label id="fakultas">Fakultas</Label>
          <Dropdown
            options={['FILKOM', 'FK', 'FKG', 'FTP']}
            value={this.state.fakultas}
            handleChange={this.handleChange}
          />
          <br />
          <br />
          <Button onClick={this.register}>
            <Loading
              disabled={this.state.loading}
              loading={this.state.loading}
            />
            Register
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
