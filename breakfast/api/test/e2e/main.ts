import { logIn } from './auth/logIn';
import { singIn } from './auth/singIn';
import { getBlogs } from './blog/getBlogs';
import { postBlog } from './blog/postBlog';
import { postComment } from './comment/postComment';
import { createRandomPerson } from './random/createRandomPerson';
import { randomFromArray } from './random/randomFromArray';
import { randomNumberBetween } from './random/randomNumberBetween';
import { postUserData } from './user/postUserData';

(async () => {
  for (let i = 0; i < 5000; i++) {
    const person = await createRandomPerson();
    const rand4Numbers = randomNumberBetween(0, 9999)
    const nickname = person.join('') + rand4Numbers;
    const email = nickname + '@email.pl'
    const password = 'P@ssw0rd'
    email.replace(/[^a-zA-Z]/g, "")
    let jwt = await singIn(nickname, email, password);
    if (randomNumberBetween(0, 10) < 5) jwt = await logIn(email, password);
    if(!jwt) {
        i--
    }
    else {
        //const user = await getUserSelf(jwt);
        const randomBlog = await randomFromArray(await getBlogs())
        const randomDate = randomNumberBetween(17, 20)+ "" + randomNumberBetween(10, 99) + "-" + randomNumberBetween(10, 12) + "-" + randomNumberBetween(10, 26)
        if (randomNumberBetween(0, 10) < 7) await postBlog(nickname, email, jwt)
        if (randomNumberBetween(0, 10) < 4) await postComment(randomBlog.id, email, jwt)
        if (randomNumberBetween(0, 10) < 3) await postUserData(person[0], person[1], "123123123", randomDate, jwt)
    }
  }
})();