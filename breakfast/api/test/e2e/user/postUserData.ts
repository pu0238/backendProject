import axios from 'axios';

export async function postUserData(firstName, lastName, phone, date, token) {
  const auth = `Bearer ${token}`;
  const res = await axios({
    method: 'post',
    url: 'http://localhost:3000/api/user/data',
    headers: { Authorization: auth },
    data: {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      birthDate: date,
    },
  }).catch((e) => {
    console.error(e.response.data.message);
  });
  if (res) return res.data;
}
