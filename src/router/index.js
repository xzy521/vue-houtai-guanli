import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/sys/login'
import Home from '@/components/home/Home'
import HomePage from '@/components/home/HomePage'
import Escdel from '@/views/Administrator/Escdel'
import indexIndex from '@/views/Administrator/index-index'
import Useradmin from '@/views/Administrator/Useradmin'
import GeneralLedger from '@/views/finance/GeneralLedger'
import Payee from '@/views/finance/Payee'
import Payment from '@/views/finance/Payment'
import Inquire from '@/views/procurement/Inquire'
import Newadd from '@/views/procurement/Newadd'
import Settle from '@/views/procurement/Settle'
import Sup from '@/views/procurement/Sup'
import Check from '@/views/product/Check'
import GodownEntry from '@/views/product/GodownEntry'
import ProductInquery from '@/views/product/Product-Inquery'
import Removal from '@/views/product/Removal'
import Client from '@/views/sell/Client'
import NewaddSell from '@/views/sell/Newadd-Sell'
import SellInquire from '@/views/sell/Sell-Inquire'
import SellSettle from '@/views/sell/Sell-Settle'
import ClassifyList from '@/views/warehouse/ClassifyList'
import ListTow from '@/views/warehouse/ListTow'
import MiNstorage from '@/views/report forms/MiNstorage'
import MpayS from '@/views/report forms/MpayS'
import MProcurement from '@/views/report forms/MProcurement'
import MRepertory from '@/views/report forms/MRepertory'
import MSell from '@/views/report forms/MSell'
import MStock from '@/views/report forms/MStock'
import ceshi from '@/views/ceshi'
import store from '@/store/index'

Vue.use(Router)

 const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/ceshi',
      name: 'ceshi',
      component: ceshi
    },
    {
      path:'/home',
      name:'home',
      component:Home,
      children:[
        {path:'/',component:HomePage},
        {path:'/administrator/Useradmin',component:Useradmin,meta:{title:'用户管理'}},
        {path:'/Escdel',component:Escdel,meta:{title:'退出'}},
        {path:'/administrator/indexindex',component:indexIndex},
        {path:'/finance/GeneralLedger',component:GeneralLedger,meta:{title:'收支登记'}},
        {path:'/finance/Payee',component:Payee,meta:{title:'收款登记'}},
        {path:'/finance/Payment',component:Payment,meta:{title:'付款登记'}},
        {path:'/procurement/Inquire',component:Inquire,meta:{title:'采购单查询'}},
        {path:'/procurement/Newadd',component:Newadd,meta:{title:'新添采购单'}},
        {path:'/procurement/Settle',component:Settle,meta:{title:'采购单了结'}},
        {path:'/procurement/Sup',component:Sup,meta:{title:'供应商管理'}},
        {path:'/product/Check',component:Check,meta:{title:'库存盘点'}},
        {path:'/product/GodownEntry',component:GodownEntry,meta:{title:'入库登记'}},
        {path:'/product/ProductInquery',component:ProductInquery,meta:{title:'库存查询'}},
        {path:'/product/Removal',component:Removal,meta:{title:'出库登记'}},
        {path:'/sell/Client',component:Client,meta:{title:'客户管理'}},
        {path:'/sell/NewaddSell',component:NewaddSell,meta:{title:'新添销售单'}},
        {path:'/sell/SellInquire',component:SellInquire,meta:{title:'销售单查询'}},
        {path:'/sell/SellSettle',component:SellSettle,meta:{title:'销售单了结'}},
        {path:'/sell/ClassifyList',component:ClassifyList,meta:{title:'产品分类'}},
        {path:'/sell/ListTow',component:ListTow,meta:{title:'产品列表'}},
        {path:'/reportforms/MiNstorage',component:MiNstorage,meta:{title:'月度入库报表'}},
        {path:'/reportforms/MpayS',component:MpayS,meta:{title:'月度收支报表'}},
        {path:'/reportforms/MProcurement',component:MProcurement,meta:{title:'月度采购报表'}},
        {path:'/reportforms/MRepertory',component:MRepertory,meta:{title:'月度库存报表'}},
        {path:'/reportforms/MSell',component:MSell,meta:{title:'月度销售报表'}},
        {path:'/reportforms/MStock',component:MStock,meta:{title:'月度出库报表'}},
      ],
      meta: { 
        requireLogin: true
      }
    },
    
  ]
})
router.beforeEach((to, from , next) => {
  // 要访问的路由路径
  const path = to.path
  console.log(to,111)
  if(path.startsWith('/procurement/') && store.state.user.models.find(model => model.modelCode === 1)){
    next()
  }else if(path.startsWith('/sell/') && store.state.user.models.find(model => model.modelCode === 2)){
    next()
  }else if(path.startsWith('/administrator/') && store.state.user.models.find(model => model.modelCode === 3)){
    next()
  }else if(path.startsWith('/finance/') && store.state.user.models.find(model => model.modelCode === 4)){
    next()
  }else if(path.startsWith('/product/') && store.state.user.models.find(model => model.modelCode === 5)){
    next()
  }else if(path.startsWith('/reportforms/') && store.state.user.models.find(model => model.modelCode === 6)){
    next()
  }else if(path === '/' ){
    next()
  }else if((path === '/home'|| path === '/ceshi'||path === '/Escdel') && store.state.user){
    next()
  }else {
    next('/ceshi')
  }

})
export default router