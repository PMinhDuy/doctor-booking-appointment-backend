import {
  collection,
  addDoc,
  query,
  getDocs,
  DocumentData,
  getDoc,
  doc,
} from 'firebase/firestore';
import { dataBase } from './config';
import { SignUpDto } from 'src/auth/dto/signUp.dto';
import { User } from 'src/modals/user.modal';

const userRef = collection(dataBase, 'users');

async function create(payload: SignUpDto) {
  try {
    const userDoc = await addDoc(userRef, {
      ...payload,
      role: 'USER',
    });
    console.log('Document written with ID: ', userDoc.id);
    return userDoc.id;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

async function getAll() {
  const usersQuery = query(userRef);
  const usersDoc = await getDocs(usersQuery);
  const users: DocumentData[] = [];

  usersDoc.forEach((user) => {
    const formattedUser = {
      id: user.id,
      ...user.data(),
    };
    users.push(formattedUser);
  });

  return users;
}

async function getById(id: string): Promise<User> {
  const userDoc = await getDoc(doc(dataBase, `users/${id}`));
  return {
    email: userDoc.data().email,
    firstName: userDoc.data().firstName,
    lastName: userDoc.data().lastName,
  };
}

async function checkExisting(email: string): Promise<boolean> {
  const users = await getAll();
  const userEmails: string[] = [];

  users.forEach((user) => {
    userEmails.push(user.email);
  });
  return userEmails.includes(email);
}

export { create, checkExisting, getAll, getById };
