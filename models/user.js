import firebase, { database } from '../libs/firebase';

export const user = async (nim: string) => {
  const userRef = database.ref('/pemilih');
  return await userRef
    .orderByChild('nim')
    .equalTo(nim)
    .limitToFirst(1)
    .once('value')
    .then(snapshot => {
      return snapshot;
    });
};

export const register = async (nim: string, nama: string, fakultas: string) => {
  const userRef = database.ref('/pemilih');
  const facultyRef = database.ref('/fakultas/' + fakultas);
  const checkUser = await user(nim);
  if (!checkUser.exists()) {
    await userRef.push({
      nim: nim,
      nama: nama,
      fakultas: fakultas,
      voted: false
    });
    await facultyRef.once('value', snapshot => {
      if (!snapshot.exists()) facultyRef.set({ total: 0 });
    });
    return true;
  } else {
    return false;
  }
};

export const getUserByNim = async (nim: string) => {
  const candidateRef = database.ref('/pemilih');
  return await candidateRef
    .orderByChild('nim')
    .equalTo(nim)
    .limitToFirst(1)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        return Object.keys(val)[0];
      } else {
        throw new Error('User tidak terdaftar');
      }
    });
};

export const getUserByUId = async (uid: string, cb: Function) => {
  const userRef = database.ref('/pemilih/' + uid);
  await userRef.on('value', snapshot => {
    const data = snapshot.val();
    cb(data);
  });
};

export const vote = async (uid: string, candidateId: string) => {
  const candidateRef = database.ref('/calon/' + candidateId);
  const userRef = database.ref('/pemilih/' + uid);
  let fakultas = '';

  // Mengubah status vote pada user
  await userRef.once('value', snapshot => {
    fakultas = snapshot.val().fakultas;
    userRef.update({ voted: !snapshot.val().voted });
  });

  const facultyRef = database.ref('/fakultas/' + fakultas);
  const candidatePerFacultyRef = database.ref(
    '/calon/' + candidateId + '/fakultas/' + fakultas
  );

  // Mengubah total vote kandidat per-fakultas
  await candidatePerFacultyRef.once('value', snapshot => {
    if (snapshot.exists()) {
      candidatePerFacultyRef.set(snapshot.val() + 1);
    } else {
      candidatePerFacultyRef.set(1);
    }
  });

  // Mengubah total vote kandidat
  await candidateRef.once('value', snapshot => {
    candidateRef.update({ total: snapshot.val().total + 1 });
  });

  // Mengubah total vote untuk fakultas
  await facultyRef.once('value', snapshot => {
    facultyRef.update({ total: snapshot.val().total + 1 });
  });
};
