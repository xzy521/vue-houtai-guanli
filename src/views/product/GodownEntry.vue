<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <ul class="hendul">
      <li class="asli" @click="hdfu()">货到付款</li>
      <li @click="hdfutow()">款到发货</li>
      <li @click="hdfutrecc()">预付款到发货</li>
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
        <el-table-column label="采购单编号" prop="poId" width="140px">
            <template slot-scope="scope" >
            <span style="display:flex" >
                <el-input type="text" v-model="scope.row.poId" style="width:120px" disabled></el-input>
                <span class="el-icon-question ico" @click="mxcp(scope.$index, scope.row)"></span>
            </span>
            
            </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="140px"></el-table-column>
        <el-table-column label="供应商名称" prop="venderName" width="100px"></el-table-column>
        <el-table-column label="创建用户" prop="account" width="120px"></el-table-column>
        <el-table-column label="附加费用" prop="tipFee" width="100px"></el-table-column>
        <el-table-column label="采购产品总价" prop="productTotal" width="110px"></el-table-column>
        <el-table-column label="采购单总价格" prop="poTotal" width="100px"></el-table-column>
        <el-table-column label="付款方式" prop="payType" width="100px">
          <template slot-scope="scope">
            <span>{{scope.row.payType|requer}}</span>
          </template>
        </el-table-column>
        <el-table-column label="最低付款金额" prop="prePayFee" width="100px"></el-table-column>
        <el-table-column label="处理状态" prop="poTotal" width="100px">
         <template slot-scope="scope">
                <span>{{scope.row.status|requerqwe}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-button size="mini" @click="settle(scope.$index, scope.row)">入库</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          layout="prev, pager, next"
          @current-change="chagepage"
          :current-page="page"
          :total="pagess*10"
        ></el-pagination>
      </div>
    </div>
    <!-- 采购单明细 -->
    <el-dialog title="采购单明细" :visible.sync="dialogFormVisible">
               <el-table
        :data="arrlistmx"
        stripe
        style="width:100%"
        class="fontab"
        element-loading-text="拼命加载中"
      >
<el-table-column label="采购单编号" prop="poId" width="140px"></el-table-column>
        <el-table-column label="供应商名称" prop="productCode" width="100px"></el-table-column>
        <el-table-column label="单价明细" prop="unitPrice" width="120px"></el-table-column>
        <el-table-column label="数量" prop="num" width="100px"></el-table-column>
        <el-table-column label="数量单位" prop="unitName" width="100px"></el-table-column>
        <el-table-column label="产品总价" prop="itemPrice" width="100px"></el-table-column>
        <el-table-column label="产品名称" prop="productName" width="100px"></el-table-column>
       </el-table>
            </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import { requestPost } from "../../axioshttp/index";
import { requestPostJson } from "../../axioshttpjson/index";
export default {
  data() {
    return {
      yc: false,
      err: "",
      sky: "true",
      page: 1,
      pagess: "",
      loading: true,
      arrlist: [],
      arrlistmx:[],
      dialogFormVisible:false,
      d: 1
    };
  },
  methods: {
    //   货到付款
    hdfu() {
      this.aso();
      this.d = 1;
    },
    //款到发货
    hdfutow() {
      this.axow();
      this.d = 2;
    },
    // 预付款到发货
    hdfutrecc() {
      this.d = 3;
      axios({
        url: "/api/main/purchase/pomain/query",
        method: "get",
        params: { page: this.page, payType: this.d = 3,status:5}
      }).then(resp => {
        let list = resp.data;
        this.pagess = list.pages;
        this.arrlist = resp.data.list;
        this.loading = false;
      });
    },
    // mxcp详情
    mxcp(index,row){
        this.dialogFormVisible = true
        axios({
        url: "/api/main/purchase/pomain/queryItem",
        method: "get",
        params: {poId:row.poId}
      }).then(resp => {
        let list = resp.data;
        // this.pagess = list.pages;
        
        this.arrlistmx = resp.data;
        this.loading = false;
      });
    },
    // 入库
    settle(index, row) {
      let poid = row.poId.toString();
      let paytype = row.payType;
     
      if( confirm("确定入库？")){
requestPost("/api/main/stock/instock", {
        poId: poid,
        payType: paytype
      }).then(resp => {
          if(resp.data.code==2){
            alert("入库成功")
              this.aso()
          }
        console.log(resp.data, "入库");
        console.log(poid, "123", paytype);
      });
      }
      
    },
    // 添加
     // fenye
    chagepage(restpage) {
      this.page = restpage;
      this.aso();
    },

    axow() {
      axios({
        url: "/api/main/purchase/pomain/query",
        method: "get",
        params: { page: this.page, payType: this.d=2 ,status:3}
      }).then(resp => {
        let list = resp.data;
        this.pagess = list.pages;
        this.arrlist = resp.data.list;
        this.loading = false;
      });
    },
    aso() {
      // axios.get("/api/main/purchase/vender/all")
      axios({
        url: "/api/main/purchase/pomain/query",
        method: "get",
        params: { page: this.page, payType: this.d=1 ,status:1}
      }).then(resp => {
        let list = resp.data;
        this.pagess = list.pages;
    
        this.arrlist = resp.data.list;
        this.loading = false;
      });
    }
  },
  mounted() {
    this.aso();
  },
  filters: {
    //   guolv付款方式
    requer(value) {
      if (value == 1) {
        return "货到付款";
      } else if (value == 2) {
        return "款到发货";
      } else if (value == 3) {
        return "预付款到发货";
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
<style  scoped>
.hendul {
  width: 1200px;
  height: 40px;
  border-bottom: 1px solid #d3dbde;
  display: flex;
  list-style: none;
}
.asli {
  margin-left: -39px;
}
.hendul li {
  width: 120px;
  height: 38px;
  background-color: #f4f7f8;
  border: 1px solid#D3DBDE;
  border-bottom: none;
  padding-top: 10px;
  box-sizing: border-box;
  text-align: center;
}
.ico{
    margin-top: 15px;
}
</style>