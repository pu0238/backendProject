import axios from 'axios';

export async function logIn(email, password) {
  const res = await axios({
    method: 'post',
    url: 'http://localhost:3000/api/auth/logIn',
    headers: {},
    data: {
      email: email,
      password: password,
    },
  }).catch((e) => {
    console.error(e.response.data.message);
  });
  if (res) return res.data.accessToken;
}
