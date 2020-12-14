import { refs } from './refs/refs';
import { signUp, signIn, addToDB, getFromDB, logOut } from './api/api';
import './styles.css';

// getFromDB();

const user = {
  email: '',
  password: '',
};

const resetUser = () => {
  user.email = '';
  user.password = '';
};

const getUserData = e => {
  const { name, value } = e.target;
  user[name] = value;
};

// async function signUpData (e) {

// }

const signUpData = async e => {
  e.preventDefault();
  const response = await signUp({ ...user, returnSecureToken: true });
  const data = { email: response.data.email, localId: response.data.localId };
  const token = response.data.idToken;
  addToDB(data, token);
  refs.signUpForm.reset();
  resetUser();
};

const signInData = async e => {
  e.preventDefault();
  const response = await signIn({ ...user, returnSecureToken: true });
  localStorage.setItem('idToken', JSON.stringify(response.data.idToken));
  refs.signInForm.reset();
  resetUser();
  getFromDB();
};

// __signUpForm
refs.signUpForm.addEventListener('input', getUserData);
refs.signUpForm.addEventListener('submit', signUpData);
// __signInForm
refs.signInForm.addEventListener('input', getUserData);
refs.signInForm.addEventListener('submit', signInData);
// __logout
refs.logoutButton.addEventListener('click', logOut)
