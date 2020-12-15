import { refs } from './refs/refs';
import { signUp, signIn, logOut } from './api/api';
import './styles.css';
import { state } from './data/data';

const user = {
  email: '',
  password: '',
};

const resetUser = () => {
  user.email = '';
  user.password = '';
};

const getUserData = e => {
  if (state) {
    document.querySelector('.error').textContent = '';
  }
  const { name, value } = e.target;
  user[name] = value;
};

const signUpData = e => {
  e.preventDefault();
  signUp(user).then(() => {
    refs.signUpForm.reset();
    resetUser();
  });
};

const signInData = async e => {
  e.preventDefault();
  signIn(user);
  refs.signInForm.reset();
  resetUser();
};

// __signUpForm
refs.signUpForm.addEventListener('input', getUserData);
refs.signUpForm.addEventListener('submit', signUpData);
// __signInForm
refs.signInForm.addEventListener('input', getUserData);
refs.signInForm.addEventListener('submit', signInData);
// __logout
refs.logoutButton.addEventListener('click', logOut);
