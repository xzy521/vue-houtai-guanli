<template>
  <div>
    <!-- 头部 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <ul class="ulli">
      <li>
        <p class="pp">销售单编号</p>
        <input type="text" class="inputc" v-model="poId" />
      </li>
      <li>
        <p class="pp">客户编号</p>
        <input type="text" v-model="venderCode" class="inputc" />
        <i class="el-icon-edit-outline ai" @click="addgys"></i>
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
        <p class="pp">付款状态</p>
        <select class="inputc" v-model="paytype">
          <option value="1">货到付款</option>
          <option value="2">款到发货</option>
          <option value="3">预付款到发货</option>
        </select>
      </li>
    </ul>
    <el-dialog title="客户编号" :visible.sync="dialogFormVisible">
      <el-form :model="formor">
        <el-form-item label="客户列表" :label-width="formLabelWidth">
          <el-select v-model="formor.name" placeholder="请选择供应商" @change="handleChange">
            <el-option
              v-for="item in resuter"
              :key="item.venderCode"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商名称" :label-width="formLabelWidth">
          <el-input v-model="formor.customerCode" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureadgyx">确 定</el-button>
      </div>
    </el-dialog>
    <ul class="ulli">
      <li>
        <p class="pp">处理状态</p>
        <select class="inputc" v-model="typ">
          <option value="1">新增</option>
          <option value="2">已收货</option>
          <option value="3">已付款</option>
          <option value="4">已了结</option>
          <option value="5">已预付</option>
        </select>
      </li>
      <li>
        <el-button type="primary" class="bt" @click="query">查询</el-button>
      </li>
    </ul>
    <!-- 表格头 -->
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
        <el-table-column label="销售单编号" prop="soId" width="100px"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="120px"></el-table-column>
        <el-table-column label="客户编号" prop="customerCode" width="100px"></el-table-column>
        <el-table-column label="创建用户" prop="account" width="120px"></el-table-column>
        <el-table-column label="附加费用" prop="tipFee" width="100px"></el-table-column>
        <el-table-column label="产品总价" prop="productTotal" width="110px"></el-table-column>
        <el-table-column label="销售单总价格" prop="soTotal" width="100px"></el-table-column>
        <el-table-column label="付款方式" prop="payType" width="100px">
          <template slot-scope="scope">
            <span>{{scope.row.payType|requer}}</span>
          </template>
        </el-table-column>
        <el-table-column label="记录" prop width="130px">
          <template slot-scope="scope">
            <span @click="xqbg(scope.$index,scope.row)">详情</span>
          </template>
        </el-table-column>
        <el-table-column label="最低付款金额" prop="prePayFee" width="100px"></el-table-column>
        <el-table-column label="处理状态" prop="status" width="100px">
        <template slot-scope="scope">
                <span>{{scope.row.status|requerqwe}}</span>
            </template>
        </el-table-column>
        <el-table-column label="备注" prop="fax" width="100px"></el-table-column>
      </el-table>
    </div>
    <div >
      <el-pagination
        layout="prev, pager, next"
        @current-change="chagepage"
        :current-page="page"
        :total="pagess*10"
      ></el-pagination>
    </div>
    <el-dialog title="库存变更记录" :visible.sync="eldialogFormVisible">
      <el-button type="primary" @click="rk">销售单预付信息</el-button>
      <el-button type="success" @click="ck">销售单出库信息</el-button>
      <el-button type="warning" @click="paykk">销售单付款信息</el-button>
      <el-button type="danger" @click="mxkk">销售单销售单明细信息</el-button>
      <!-- 预付信息 -->
      <div v-show="rksky">
        <el-table
          :data="arrlistmx"
          stripe
          style="width:100%"
          class="fontab"
          element-loading-text="拼命加载中"
        >
          <el-table-column label="预付时间" prop="prePayTime" width="180px"></el-table-column>
          <el-table-column label="预付操作用户" prop="prePayUser" width="140px"></el-table-column>
          
         
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
          <el-table-column label="出库操作用户" prop="stockUser" width="140px"></el-table-column>
         
        </el-table>
      </div>
      <div v-show="payk">
        <el-table
          :data="paykarrlist"
          stripe
          style="width:100%"
          class="fontab"
          element-loading-text="拼命加载中"
        >
          <el-table-column label="付款时间" prop="payTime" width="140px"></el-table-column>
        <el-table-column label="付款操作用户" prop="payUser" width="160px"></el-table-column>
       </el-table>
        
      </div>
       <div v-show="mxk">
        <el-table
          :data="mxkarrlist"
          stripe
          style="width:100%"
          class="fontab"
          element-loading-text="拼命加载中"
        >
          <el-table-column label="产品编号" prop="soId" width="140px"></el-table-column>
        <el-table-column label="产品名称" prop="productCode" width="100px"></el-table-column>
        <el-table-column label="销售单价" prop="unitPrice" width="120px"></el-table-column>
        <el-table-column label="产品数量" prop="num" width="100px"></el-table-column>
        <el-table-column label="数量单位" prop="unitName" width="100px"></el-table-column>
        <el-table-column label="产品总价" prop="itemPrice" width="100px"></el-table-column>
        <el-table-column label="产品名称" prop="productName" width="100px"></el-table-column>
       </el-table>
        
      </div>
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
        page:1,
      pagess: "",
      poId: "",
      soId:'',
      value1: "",
      arrlist: [],
      paytype: "",
      row:{},
      typ: "",
      soId:'',
      cksky:false,
      rksky:false,
      mxk:false,
      payk:false,
      arrlistmx: [],
      ckarrlist:[],
      mxkarrlist:[],
      paykarrlist:[],
      venderCode: "",
      dialogFormVisible: false,
      eldialogFormVisible:false,
      formLabelWidth: "120px",
       resuter: "",
      formor: {
        name: "",
        customerCode: ""
      }
    };
  },
  methods: {
    //   axios
    aso(){
         axios({
        url: "/api/main/sell/somain/query",
        method: "get",
        params: {soId:this.poId,customerCode:this.venderCode, payType:this.paytype,stateDate:this.value1[0],endDate:this.value1[1],status:this.typ,page:this.page}
      }).then(resp => {
        let list = resp.data;
        this.pagess = list.pages;
        this.arrlist = resp.data.list;
        
      });
    },
     xqbg(index, row) {
      console.log(index, row);
      this.eldialogFormVisible = true;
      this.productCode = row.productCode
      this.soId=row.soId
      this.row = row
      this.rksky = false
      this.cksky = false
      this.mxk = false
      this.payk = false
    },
    // 查询
    query() {
      console.log(this.poId, this.typ, this.venderCode,this.paytype, this.value1);
     this.aso();
    },
     // fenye
    chagepage(restpage) {
      this.page = restpage;
      this.aso();
    },
    // 供应商下拉
    handleChange() {
      let i = 0;
      for (i = 0; i < this.resuter.length; i++) {
        if (this.resuter[i].name == this.formor.name) {
          break;
        }
        this.formor.customerCode = this.resuter[i].customerCode;
      }
    },
    // 供应商
    addgys() {
         (this.dialogFormVisible = true),
        axios.get("/api/main/sell/customer/show").then(resp => {
          console.log(resp.data, "客户");
          let rest = resp.data.list;
          this.resuter = rest;
          // this.formor.name = rest;
          // console.log("new",this.formor.name);
        });
    },
    // 确定
    sureadgyx(){
        this.venderCode= this.formor.customerCode
        this.dialogFormVisible = false;
    },
       //   销售单预付信息
  rk() {
      this.rksky = true
      this.cksky = false
      this.mxk = false
      this.payk = false
      this.arrlistmx=[],
      this.arrlistmx.push(this.row)

    
  },
//   出库信息
ck(){
    this.cksky = true
    this.rksky = false
    this.mxk = false
    this.payk = false
    this.ckarrlist=[],
      this.ckarrlist.push(this.row)

     
},
// 销售单明细
mxkk(){
    this.cksky =false
    this.rksky =false
    this.mxk = true
    this.payk = false
    axios({
        url: "/api/main/sell/somain/queryItem",
        method: "get",
        params: {
          soId:this.soId
        }
      }).then(resp => {
        this.mxkarrlist = resp.data
        
      });
},
paykk(){
    this.cksky =false
    this.rksky =false
    this.mxk = false
    this.payk = true
    this.paykarrlist=[],
      this.paykarrlist.push(this.row)
    
},
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