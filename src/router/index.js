import Vue from 'vue'
import Router from 'vue-router'
import loginSystem from '../page/loginSystem'
import mainPage from '../page/mainPage'
import collateralMonitor from '../page/collateralMonitor'
import myPage from '../page/myPage'
import authenticCenter from '../page/authenticCenter'
import loanApplication from '../page/loanApplication'
import repayment from '../page/repayment'

Vue.use(Router)


const routes = [
	{
		path: '/loginSystem',
        name:'loginSystem',
		component: loginSystem,
	},
    {
        path: '/mainPage',
        name: 'mainPage',
        component: mainPage
    },
    {
        path: '/myPage',
        name: 'myPage',
        component: myPage
    },
    {
        path: '/collateralMonitor',
        name: 'collateralMonitor',
        component: collateralMonitor
    },
    {
        path: '/authenticCenter',
        name: 'authenticCenter',
        component: authenticCenter
    },
    {
        path: '/loanApplication',
        name: 'loanApplication',
        component: loanApplication
    },
    {
        path: '/repayment',
        name: 'repayment',
        component: repayment
    }
]

export default new Router({
	routes,
	// strict: process.env.NODE_ENV !== 'production',
})
