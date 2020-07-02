<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>月度报表</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="hend">
     <el-date-picker
      v-model="value2"
      value-format="yyyy-MM"
      type="month"
      placeholder="选择月">
    </el-date-picker>
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
        <el-table-column label="出库单据数" prop="total" width="140px"></el-table-column>
        <el-table-column label="产品总数量" prop="totalNum" width="140px"></el-table-column>
        <el-table-column label="出库产品总金额" prop="productTotal" width="160px"></el-table-column>
       </el-table>
      <!-- //  明细信息 -->
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
        <el-table-column label="采购单号" prop="poId" width="140px"></el-table-column>
        <el-table-column label="入库时间" prop="stockTime" width="160px"></el-table-column>
        <el-table-column label="产品编号" prop="productCode" width="100px"></el-table-column>
        <el-table-column label="产品名称" prop="name" width="120px"></el-table-column>
        <el-table-column label="产品数" prop="stockNum" width="100px"></el-table-column>
        <el-table-column label="产品总金额" prop="productTotal" width="110px"></el-table-column>
       </el-table>
       <el-pagination
        layout="prev, pager, next"
        @current-change="chagepage"
        :current-page="page"
        :total="pagess*10"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      value2:"",
      arrlist:[],
      arrlistmx:[],
      page:1,
      pagess:'',
    };
  },
  methods:{
      // fenye
    chagepage(restpage) {
      this.page = restpage;
      this.aso();
    },
    // aso
    aso(){
      axios({
        url:"/api/main/report/instock/main",
        method:"get",
        params:{time:this.value2,page:this.page}
      }).then(resp=>{
        this.arrlist = [];
        this.arrlist.push(resp.data)
        this.arrlistmx= resp.data.details.list
        this.pagess = resp.data.details.pages;
        console.log(resp);
        
      })
    },
    // 查询
    query(){
      console.log(this.value2);
      this.aso()
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