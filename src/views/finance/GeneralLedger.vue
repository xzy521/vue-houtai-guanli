<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>财务收支</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <ul class="ulli">
      <li>
        <p class="pp">单据号</p>
        <input type="text" class="inputc" v-model="poId" />
      </li>
      <li>
        <p class="pp">付款方式</p>
        <select class="inputc" v-model="paytype">
          <option value="1">货到付款</option>
          <option value="2">款到发货</option>
          <option value="3">预付款到发货</option>
        </select>
      </li>
      <li>
        <p class="pp">日期范围</p>
        <el-date-picker
          v-model="value1"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="inptc"
        ></el-date-picker>
      </li>
      <li>
        <p>收支类型</p>
        <select class="inputc" v-model="type">
          <option value="收入">收入</option>
          <option value="支出">支出</option>
        </select>
      </li>
      <li>
        <el-button type="primary" class="bt" @click="query">查询</el-button>
      </li>
    </ul>
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
        <el-table-column label="付款(收款)日期" prop="payTime" width="180px"></el-table-column>
        <el-table-column label="单据号" prop="ordercode" width="160px"></el-table-column>
        <el-table-column label="付款(收款)金额" prop="payPrice" width="140px"></el-table-column>
        <el-table-column label="经手人" prop="account" width="130px"></el-table-column>
    
        <el-table-column label="付款方式" prop="payType" width="140px">
          <template slot-scope="scope">
            <span>{{scope.row.payType|requer}}</span>
          </template>
        </el-table-column>
        
      </el-table>
    </div>
    <el-pagination
        layout="prev, pager, next"
        @current-change="chagepage"
        :current-page="page"
        :total="pagess*10"
      ></el-pagination>
  </div>
</template>
<script>
import axios from "axios";
import { requestPost } from "../../axioshttp/index";
import { requestPostJson } from "../../axioshttpjson/index";
export default {
  data() {
    return {
      value1: "",
      paytype: "",
      poId: "",
      type: "收入",
      arrlist:[],
      page:1,
      pagess: "",
    };
  },
  methods: {
      // fenye
    chagepage(restpage) {
      this.page = restpage;
      this.aso();
    },
    // 查询
    query() {
      console.log(this.paytype, this.poId, this.type);
      this.aso();
      this.page="1"
    },
    aso() {
      axios({
        url: "/api/main/finance/query",
        method: "get",
        params: { type: this.type,page:this.page,startDate:this.value1[0],endDate:this.value1[1],payType:this.paytype,no:this.poId}
      }).then(resp => {
        let list = resp.data;

        this.pagess = list.pages;
        this.arrlist = resp.data.list;
      });
    }
  },
  filters:{
      requer(value){
        if(value==1){
            return "货到付款"
        }else if(value==2){
            return '款到发货'
        }else if(value==3){
            return "预付款到发货"
        }
    },
  }
};
</script>
<style scoped>
.ulli {
  list-style: none;
  display: flex;
  margin-left: -54px;
}
.ulli li {
  display: flex;
}
.inputc {
  width: 140px;
  height: 30px;
  margin-top: 10px;
}
.inptc {
  margin-top: 5px;
}
.pp {
  width: 92px;
  height: 22px;
  text-align: center;
  margin-top: 19px;
  margin-right: 8px;
  font-size: 14px;
}
.bt {
  width: 80px;
  height: 30px;
  margin: 10px 0 0 10px;
}
.ai {
  margin-top: 20px;
}
</style>