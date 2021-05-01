import axios from 'axios'
import { is, curryN, gte } from 'ramda'

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number)
  return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
})
const in200s = isWithin(200, 299)
const userApiClient = axios.create({
  baseURL: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-rapidapi-key':'30a79d49e4msh60149164f98a8a5p16accdjsn3726a274f766',
    'x-rapidapi-host':'google-search3.p.rapidapi.com',
    'useQueryString': true
  },
  //timeout: 3000,
});

function getList(params) {
  let url = `https://google-search3.p.rapidapi.com/api/v1/search/q=${params.keyword}&num=${params.num}` ;
  return userApiClient.get(url, {

  }).then((response) => {
    console.log('response', response)
    if (in200s(response.status)) {
      return response.data
    }
    return nulls
  }).catch(error => {
    console.log(error.response)
    return null
  });
}

export const apiService = {
  getList,
}