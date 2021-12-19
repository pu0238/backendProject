import axios from 'axios'

export async function singIn(username, email, password) {
    const res = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/auth/singin',
        headers: {}, 
        data: {
            "username": username,
            "email": email,
            "password": password
        }
      }).catch((e) => {
        console.error(e.response.data.message);
      });
      if (res) return res.data.accessToken;
}
