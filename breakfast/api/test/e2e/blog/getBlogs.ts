import axios from 'axios'

export async function getBlogs() {
    const res = await axios({
        method: 'get',
        url: 'http://localhost:3000/api/blog',
      }).catch((e) => {
        console.error(e.response.data.message);
      });
      if (res) return res.data;
}
