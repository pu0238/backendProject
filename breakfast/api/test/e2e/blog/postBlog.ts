import axios from 'axios'

export async function postBlog(title, contents, token) {
    const auth = `Bearer ${token}`
    const res = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/blog',
        headers: {Authorization: auth}, 
        data: {
            "title": title,
            "contents": contents
        }
      }).catch((e) => {
        console.error(e.response.data.message);
      });
      if (res) return res.data.accessToken;
}
