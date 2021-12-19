import axios from 'axios'

export async function postComment(post, contents, token) {
    const auth = `Bearer ${token}`
    const res = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/blog/comment',
        headers: {Authorization: auth}, 
        data: {
            "post": post,
            "contents": contents
        }
      }).catch((e) => {
        console.error(e.response.data.message);
      });
      if (res) return res.data.accessToken;
}
