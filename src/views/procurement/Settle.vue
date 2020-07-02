<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>采购管理</el-breadcrumb-item>
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
        v-show="sky"
        element-loading-text="拼命加载中"
      >
        <el-table-column label="序号" width="60" type="index">
          <template scope="scope">
            <span>{{ scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购单编号" prop="poId" width="140px">
          <template slot-scope="scope">
            <span style="display:flex">
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
        <el-table-column label="处理状态" prop="poTotal" width="100px"></el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-button size="mini" @click="settle(scope.$index, scope.row)">了结</el-button>
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
  </div>
</template>
<script>
import axios from "axios";
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
      arrlistmx: [],
      dialogFormVisible: false,
      d: 1
    };
  },
  methods: {
    // fenye
    chagepage(restpage) {
      this.page = restpage;
      this.aso();
    },
    //   货到付款
    hdfu() {
      this.aso();
      this.d = 1;
      console.log("asdas");
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
        url: "/api/main/purchase/pomain/show",
        method: "get",
        params: { page: this.page, payType: this.d, type: 4 }
      }).then(resp => {
        let list = resp.data;
        this.pagess = list.pages;
        this.arrlist = resp.data.list;
        this.loading = false;
      });
    },
    // mxcp详情
    mxcp(index, row) {
      this.dialogFormVisible = true;
      axios({
        url: "/api/main/purchase/pomain/queryItem",
        method: "get",
        params: { poId: row.poId }
      }).then(resp => {
        let list = resp.data;
        // this.pagess = list.pages;

        this.arrlistmx = resp.data;
        this.loading = false;
      });
    },
    // 了结
    settle(index, row) {
      let poid = row.poId.toString();
      let paytype = row.payType;
      console.log(poid);
      if (confirm("确认要了结吗？")) {
        requestPost("/api/main/purchase/pomain/end", {
          poId: poid,
          payType: paytype
        }).then(resp => {
          console.log(resp.data, "了结");
          console.log(poid, "123", paytype);
          this.arrlist = resp.data.data.list
          alert(resp.data.message)
        });
      }
    },
    // 添加

    axow() {
      axios({
        url: "/api/main/purchase/pomain/show",
        method: "get",
        params: { page: this.page, payType: (this.d = 2), type: 4 }
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
        url: "/api/main/purchase/pomain/show",
        method: "get",
        params: { page: this.page, payType: (this.d = 1), type: 4 }
      }).then(resp => {
        let list = resp.data;
        this.pagess = list.pages;
        this.arrlist = resp.data.list;
        this.loading = false;
      });
    }
  },
  created() {
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
.ico {
  margin-top: 15px;
}
</style>