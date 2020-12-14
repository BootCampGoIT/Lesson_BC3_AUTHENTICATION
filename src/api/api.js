import axios from 'axios';

const API_KEY = 'AIzaSyDWGmw4qbJhUwmfEP16B6FLPTNAXQcmwVY';
const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const baseURL = 'https://lessonauth-8c72e-default-rtdb.firebaseio.com';

const signUp = user => {
  return axios.post(signUpURL, user);
};

const signIn = user => {
  return axios.post(signInURL, user);
};

const logOut = () => {
  localStorage.clear();
}

const addToDB = (data, token) => {
  axios.post(`${baseURL}/users.json?auth=${token}`, data);
};

const getFromDB = () => {
  if (localStorage.getItem('idToken')) {
    const token = JSON.parse(localStorage.getItem('idToken'));
    console.log('token', token)
    axios
      .get(`${baseURL}/users.json?auth=${token}`)
      .then(response => console.log(response.data));
  } else console.log('no token');
};


// const setToDB =() => {
//   const token = JSON.parse(localStorage.getItem('idToken'));
//   axios.post(`${baseURL}/users.json?auth=${token}`, {email: "test", password: "test"})
// }

export { signUp, signIn, addToDB, getFromDB, logOut };
