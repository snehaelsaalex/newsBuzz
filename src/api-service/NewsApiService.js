import axios from 'axios';

export async function getData (url) {
   let response =  await axios.get(url);
   return await response.data.articles;
    // axios.get(url)
    //     .then(response => {
    //         return  response.data;
    //     })
    //     .catch(error => {
    //       return  error;
    //     });
}

 