import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {requestPost} from '../axioshttp/index'
import Cookies from 'js-cookie'

const store = new Vuex.Store({
    state: {
        user: JSON.parse(Cookies.get('user') || '{}'),
        token: Cookies.get('token'),
        useradmin:localStorage.getItem('useradmin')
    },
    mutations: {
       user_mutation(state, payload){
        state.user = payload
       }, 
       token_mutation(state, payload){
        state.token = payload
       }, 
    },
    actions: {
        loginAction(context, payload){
            return new Promise((resolve, reject) => {
                requestPost('/api/sys/login', payload).then(resp => {
                    let result = resp.data
                    if(result.code === 2){ // 登录成功
                        context.commit('user_mutation', result.data.user)
                        context.commit('token_mutation', result.data.token)
                        Cookies.set('user', JSON.stringify(result.data.user))
                        localStorage.setItem('useradmin',JSON.stringify(result.data))
                        Cookies.set('token', result.data.token)
                        
                        resolve()
                    }else{ // 失败
                        reject(result.message)
                    }
                })
            })
        }
    }
})

export default store