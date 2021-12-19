import axios from 'axios'

export async function getUserSelf(token) {
    const auth = `Bearer ${token}`
    const res = await axios({
        method: 'get',
        url: 'http://localhost:3000/api/user/self/data',
        headers: {Authorization: auth}, 
      }).catch((e) => {
        console.error(e.response.data.message);
      });
      if (res) return res.data;
}
