import Vue from 'vue'
import Vuex from 'vuex'
// import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex)

const state = {
	adminInfo: {
		avatar: 'default.jpg'
	},
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	}
}

const actions = {
	async getAdminData({commit}){
		try{
			const res = await getAdminInfo()
			if (res.status == 1) {
				commit('saveAdminInfo', res.data);
			}else{
				throw new Error(res)
			}
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	}
}

export default new Vuex.Store({
    state: {
        token: '',
        token1: '',
        axis: [{
            ratio: '',
            term: ''
        }],
        EnterpriseLoginRequest: JSON.parse(sessionStorage.getItem("EnterpriseLoginRequest"))
    },
    mutations: {
        // set
        SET_TOKEN: (state, token) => {
            state.token = token
            localStorage.setItem("token", token)
        },
        SET_TOKEN1: (state1, token1) => {
            state1.token = token1
            localStorage.setItem("token1", token1)
        },
        SET_AXIS: (axis, token2) => {
            axis.ratio = token2.ratio
            axis.term = token2.term
            localStorage.setItem("axis", token2)
        },
        // SET_EnterpriseLoginRequest: (state, EnterpriseLoginRequest) => {
        //     state.EnterpriseLoginRequest = EnterpriseLoginRequest
        //     sessionStorage.setItem("EnterpriseLoginRequest", JSON.stringify(EnterpriseLoginRequest))
        // },
        // REMOVE_INFO: (state) => {
        //     state.token = ''
        //     state.EnterpriseLoginRequest = {}
        //     localStorage.setItem("token", '')
        //     sessionStorage.setItem("EnterpriseLoginRequest", JSON.stringify(''))
        // }

    },
    getters: {
        // get
        getEnterpriseLoginRequest: state => {
            return state.EnterpriseLoginRequest
        }

    },
	actions:{

    },
})
