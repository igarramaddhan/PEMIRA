import firebase, { database } from '../libs/firebase';

export const addCandidate = async (name: string) => {
  const candidateRef = database.ref('/calon');
  return await candidateRef
    .orderByChild('nama')
    .equalTo(name)
    .limitToFirst(1)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        console.log('Sudah terdaftar');
        console.log(snapshot.val());
        throw new Error('Calon kandidat sudah terdaftar');
      }
      candidateRef.push({ nama: name, total: 0 });
      return true;
    });
};

export const getCandidates = async () => {
  const candidateRef = database.ref('/calon');
  return await candidateRef
    .orderByChild('nama')
    .once('value')
    .then(snapshot => snapshot);
};

export const getCandidate = async (uid: string, cb: Function) => {
  const candidateRef = database.ref('/calon/' + uid);
  await candidateRef.on('value', snapshot => {
    cb(snapshot.val());
  });
};

export const getTotal = async (fakultas: string, cb: Function) => {
  const facultyRef = database.ref('/fakultas/' + fakultas);
  await facultyRef.on('value', snapshot => {
    cb(snapshot.val());
  });
};

export const getTotalPemilih = async (cb: Function) => {
  const pemilihRef = database.ref('/pemilih');
  await pemilihRef.on('value', snapshot => {
    cb(snapshot.numChildren());
  });
};
