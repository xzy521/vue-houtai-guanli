import axios from 'axios'
import store from '../store'
const qs = require('querystring')

axios.interceptors.request.use(function (config) {
    if(store.state.token)
        config.headers.token = store.state.token
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  })


export function requestPost(url, data){
    return axios.post(url, qs.stringify(data), {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    })
} 