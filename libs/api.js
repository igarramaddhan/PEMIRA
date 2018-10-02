import Axios from 'axios';
import firebase from './firebase';
import * as Admin from '../models/admin';
import * as User from '../models/user';

const database = firebase.database();

const BASE_URL = 'https://api2.dhimas.tech/siam/fetch';

export const client = Axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
});

export const login = async (props: { nim: string, password: string }) => {
  try {
    const login = await client.post('/bio', {
      nim: props.nim,
      password: props.password,
      token: 'toke'
    });
    return login.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (nim: string, nama: string, fakultas: string) => {
  try {
    const user = await User.register(nim, nama, fakultas);
    if (user) {
      console.log('user not found');
      return true;
    } else {
      console.log('user found');
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export const getUserByNim = async (nim: string) => {
  try {
    return await User.getUserByNim(nim);
  } catch (error) {
    throw error;
  }
};

export const getUserByUId = async (uid: string, cb = user => {}) => {
  try {
    let user = {};
    await User.getUserByUId(uid, data => {
      user = data;
      cb(user);
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const vote = async (uid: string, candidateId: string) => {
  try {
    await User.vote(uid, candidateId);
  } catch (error) {
    throw error;
  }
};

// Admin

export const addCandidate = async (name: string) => {
  try {
    const res = await Admin.addCandidate(name);
  } catch (error) {
    throw error;
  }
};

export const getCandidates = async () => {
  try {
    const candidates = await Admin.getCandidates();
    let data = [];
    candidates.forEach(element => {
      let item = element.val();
      item.id = element.key;
      data.push(item);
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getTotal = async (fakultas: string, cb: Function) => {
  try {
    let total = 0;
    await Admin.getTotal(fakultas, val => {
      total = val;
      cb(val);
    });
    return total;
  } catch (error) {
    throw error;
  }
};

export const getCandidate = async (uid: string, cb: Function) => {
  try {
    let candidate = null;
    await Admin.getCandidate(uid, val => {
      candidate = val;
      cb(val);
    });
    return candidate;
  } catch (error) {
    throw error;
  }
};

export const getTotalPemilih = async (cb: Function) => {
  try {
    let total = null;
    await Admin.getTotalPemilih(val => {
      total = val;
      cb(val);
    });
    return total;
  } catch (error) {
    throw error;
  }
};
