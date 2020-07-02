<template>
  <div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <ul class="ulli">
      <li>
        <p class="pp">产品编号</p>
        <input type="text" class="inputc" v-model="poId" />
      </li>
      <li>
        <p class="pp">产品名称</p>
        <input type="text" v-model="name" class="inputc" />
      </li>
      <li>
        <p class="pp">库存数量范围</p>
        <input type="text" v-model="mix" placeholder="最小值" class="inputc" />
        <input type="text" v-model="max" placeholder="最大值" class="inputcright" />
      </li>
      <li>
        <el-button type="primary" class="bt" @click="query">查询</el-button>
      </li>
    </ul>
    <!-- 库存信息 -->
    <div>
      <el-table
        :data="arrlist"
        stripe
        style="width:100%"
        class="fontab"
        element-loading-text="拼命加载中"
      >
        <el-table-column label="序号" width="80" type="index">
          <template scope="scope">
            <span>{{ scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品编号" prop="productCode" width="180px"></el-table-column>
        <el-table-column label="产品名称" prop="name" width="180px"></el-table-column>
        <el-table-column label="库存数量" prop="num" width="160px"></el-table-column>
        <el-table-column label="采购在途数" prop="poNum" width="180px"></el-table-column>
        <el-table-column label="预销售数" prop="soNum" width="130px"></el-table-column>
        <el-table-column label="变更记录" prop width="130px">
          <template slot-scope="scope">
            <span @click="xqbg(scope.$index,scope.row)">详情</span>
          </template>
        </el-table-column>

        <!-- <el-table-column label="付款方式" prop="payType" width="100px">
          <template slot-scope="scope">
            <span>{{scope.row.payType|requer}}</span>
          </template>
        </el-table-column>-->
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        @current-change="chagepage"
        :current-page="page"
        :total="pagess*10"
      ></el-pagination>
    </div>
    <el-dialog title="库存变更记录" :visible.sync="dialogFormVisible">
      <el-button type="primary" @click="rk">入库记录信息</el-button>
      <el-button type="success" @click="ck">出库记录信息</el-button>
      <!-- 入库信息 -->
      <div v-show="rksky">
        <el-table
          :data="arrlistmx"
          stripe
          style="width:100%"
          class="fontab"
          element-loading-text="拼命加载中"
        >
          <el-table-column label="入库时间" prop="stockTime" width="180px"></el-table-column>
          <el-table-column label="相关采购单号" prop="orderCode" width="140px"></el-table-column>
          <el-table-column label="入库经手人" prop="createUser" width="120px"></el-table-column>
          <el-table-column label="入库数量" prop="stockNum" width="100px"></el-table-column>
          <el-table-column label="入库类型" prop="stockType" width="100px">
          <template slot-scope="scope">
              <span>{{scope.row.stockType|requerqwe}}</span>
          </template>
          </el-table-column>
         
        </el-table>
      </div>
      <!-- 出库信息 -->
       <div v-show="cksky">
        <el-table
          :data="ckarrlist"
          stripe
          style="width:100%"
          class="fontab"
          element-loading-text="拼命加载中"
        >
          <el-table-column label="出库时间" prop="stockTime" width="180px"></el-table-column>
          <el-table-column label="相关销售单号" prop="orderCode" width="140px"></el-table-column>
          <el-table-column label="出库经手人" prop="createUser" width="120px"></el-table-column>
          <el-table-column label="出库数量" prop="stockNum" width="100px"></el-table-column>
          <el-table-column label="出库类型" prop="stockType" width="100px">
          <template slot-scope="scope">
              <span>{{scope.row.stockType|requer}}</span>
          </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { requestPost } from "../../axioshttp/index";
import { requestPostJson } from "../../axioshttpjson/index";
export default {
  data() {
    return {
      page: 1,
      pagess: "",
      poId: "",
      name: "",
      mix: "0",
      max: "",
      arrlist: [],
      dialogFormVisible: false,
      arrlistmx: [],
      ckarrlist:[],
      rksky:false,
      cksky:false,
     productCode:'',
    };
  },
  methods: {
    chagepage(restpage) {
      this.page = restpage;
      this.aso();
    },
    // 查询
    query() {
      if (this.mix < 0) {
        this.mix = 0;
      }
      if (this.max < 0) {
        this.max = 0;
      }
      console.log(this.poId, this.name, this.mix, this.max);

      this.aso();
    },
    aso() {
      axios({
        url: "/api/main/stock/query",
        method: "get",
        params: {
          productCode: this.poId,
          name: this.name,
          mix: this.min,
          max: this.max,
          page: this.page
        }
      }).then(resp => {
        this.arrlist = resp.data.list;
        this.pagess = resp.data.pages;
      });
    },
    // 变更库存
    xqbg(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true;
      this.productCode = row.productCode
    },
     //   入库信息
  rk() {
      this.rksky = true
      this.cksky = false
    axios({
        url: "/api/main/stock/alterRecord",
        method: "get",
        params: {
          productCode: this.productCode,
          stockType:1
        }
      }).then(resp => {
        this.arrlistmx = resp.data.data.list;
        console.log(this.arrlistmx);
        
      });
  },
//   出库信息
ck(){
    this.cksky = true
    this.rksky = false
     axios({
        url: "/api/main/stock/alterRecord",
        method: "get",
        params: {
          productCode: this.productCode,
          stockType:2
        }
      }).then(resp => {
        this.ckarrlist = resp.data.data.list;
        console.log(this.ckarrlist,"666");
        
      });
}
  },
 filters: {
    //   guolv付款方式
    requer(value) {
      if (value == 1) {
        return "销售出库";
      } else if (value == 2) {
        return "盘点出库";
      } 
    },
    requerqwe(value) {
      if (value == 1) {
        return "采购入库";
      } else if (value == 2) {
        return "盘点入库";
      } 
    }
  }
};
</script>
<style  scoped>
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
.inputcright {
  width: 140px;
  height: 30px;
  margin-top: 10px;
  margin-left: 10px;
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
  height: 40px;
  margin: 10px 0 0 10px;
}
.ai {
  margin-top: 20px;
}
</style>