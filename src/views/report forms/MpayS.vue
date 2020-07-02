<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>月度报表</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="hend">
      <el-date-picker v-model="value2" value-format="yyyy-MM" type="month" placeholder="选择月"></el-date-picker>
    <el-button type="primary" @click="query">查询</el-button>
    </div>
    <div>
      <el-table
        :data="arrlist"
        stripe
        style="width:100%"
        class="fontab"
        element-loading-text="拼命加载中"
      >
        <el-table-column label="序号" width="60" type="index">
          <template scope="scope">
            <span>{{ scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="收款总金额" prop="recePrice" width="140px"></el-table-column>
        <el-table-column label="付款总金额" prop="payPrice" width="140px"></el-table-column>
        <el-table-column label="收款交易次数" prop="receCount" width="160px"></el-table-column>
        <el-table-column label="付款交易次数" prop="payCount" width="160px"></el-table-column>
      </el-table>
    </div>
    <el-button type="primary" @click="skypay">收款明细</el-button>
    <el-button type="success" @click="paysky">付款明细</el-button>
    <!-- 收款明细 -->
    <div v-show="spsky">
      <el-table
        :data="arrlistmx"
        stripe
        style="width:100%"
        class="fontab"
        element-loading-text="拼命加载中"
      >
        <el-table-column label="序号" width="60" type="index">
          <template scope="scope">
            <span>{{ scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售单号" prop="soId" width="140px"></el-table-column>
        <el-table-column label="销售单时间" prop="createTime" width="160px"></el-table-column>
        <el-table-column label="收款日期" prop="pay_time" width="160px"></el-table-column>
        <el-table-column label="收款金额" prop="pay_price" width="120px"></el-table-column>
        <el-table-column label="经手人" prop="account" width="100px"></el-table-column>
        <el-table-column label="处理状态" prop="status" width="110px">
            <template slot-scope="scope">
            <span>{{scope.row.status|requerqwe}}</span>
          </template>
        </el-table-column>
      </el-table>
       <el-pagination
        layout="prev, pager, next"
        @current-change="chagepage"
        :current-page="page"
        :total="pagess*10"
      ></el-pagination>
    </div>
    <!-- 付款明细 -->
    <div v-show="pasky">
      <el-table
        :data="arrlistpask"
        stripe
        style="width:100%"
        class="fontab"
        element-loading-text="拼命加载中"
      >
        <el-table-column label="序号" width="60" type="index">
          <template scope="scope">
            <span>{{ scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购单号" prop="poId" width="140px"></el-table-column>
        <el-table-column label="采购时间" prop="createTime" width="160px"></el-table-column>
        <el-table-column label="付款日期" prop="pay_time" width="160px"></el-table-column>
        <el-table-column label="付款金额" prop="pay_price" width="120px"></el-table-column>
        <el-table-column label="经手人" prop="account" width="100px"></el-table-column>
        <el-table-column label="处理状态" prop="status" width="110px">
            <template slot-scope="scope">
            <span>{{scope.row.status|requerqwe}}</span>
          </template>
        </el-table-column>
      </el-table>
       <el-pagination
        layout="prev, pager, next"
        @current-change="chagepagefk"
        :current-page="pagetow"
        :total="pagesstow*10"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      value2: "",
      arrlist: [],
      arrlistmx: [],
      arrlistpask:[],
      page:1,
      pagess:'',
      pagetow:1,
      pagesstow:'',
      spsky:false,
      pasky:false,
    };
  },
  methods: {
      // fenye
    chagepage(restpage) {
      this.page = restpage;
      this.skaso()
    },
    // fenye2
    chagepagefk(restpage) {
      this.pagetow = restpage;
      this.paysos()
    },
    // 查询
    query() {
      console.log();
      this.arrlist=[]
      this.aos()
    },
    aos(){
        axios({
            url:'/api/main/report/payment/main',
            method:"get",
            params:{time:this.value2,}
        }).then(resp=>{
            console.log(resp.data);
            this.arrlist.push(resp.data)
        })
    },
    // 收款mingxi
    skypay(){
        this.spsky = true;
        this.pasky = false
        this.skaso()
    },
    // 收款axios
    skaso(){
        axios({
            url:'/api/main/report/payment/detail/receipt',
            method:"get",
            params:{time:this.value2,page:this.page}
        }).then(resp=>{
            console.log(resp.data);
            this.arrlistmx=resp.data.list
            this.pagess = resp.data.pages;
        })
    },
    // 付款明细
    paysky(){
        this.spsky = false
        this.pasky = true
        this.paysos()
    },
    // 付款axios
    paysos(){
        axios({
            url:'/api/main/report/payment/detail/pay',
            method:"get",
            params:{time:this.value2,page:this.pagetow}
        }).then(resp=>{
            console.log(resp.data);
            this.arrlistpask=resp.data.list
            this.pagesstow = resp.data.pages;
        })
    }
  },
  filters:{
    //   guolv付款方式
    requer(value){
        if(value==1){
            return "货到付款"
        }else if(value==2){
            return '款到发货'
        }else if(value==3){
            return "预付款到发货"
        }
    },
    requerqwe(value) {
      if (value == 1) {
        return "新增";
      } else if (value == 2) {
        return "已发货";
      } else if (value == 3) {
        return "已收款";
      } else if (value == 4) {
        return "已了结";
      } else if (value == 5) {
        return "已预付";
      }
    }
  }
};
</script>
<style scoped>
.hend{
  margin-top: 15px;
}
</style>