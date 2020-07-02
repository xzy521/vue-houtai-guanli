<template>
  <div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>采购管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 -->
    <ul class="ulli">
      <li>
        <p class="pp">采购单编号</p>
        <input type="text" class="inputc" v-model="poId" />
      </li>
      <li>
        <p class="pp">供应商</p>
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
    <el-dialog title="供应商编号" :visible.sync="dialogFormVisible">
      <el-form :model="formor">
        <el-form-item label="供应商列表" :label-width="formLabelWidth">
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
          <el-input v-model="formor.venderCode" autocomplete="off"></el-input>
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
        <el-table-column label="采购单编号" prop="poId" width="140px"></el-table-column>
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
        <el-table-column label="处理状态" prop="status" width="100px">
        <template slot-scope="scope">
            <span>{{scope.row.status|requerqwe}}</span>
          </template></el-table-column>
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
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
        page:1,
      pagess: "",
      poId: "",
      value1: "",
      arrlist: [],
      paytype: "",
      typ: "",
      venderCode: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
       resuter: "",
      formor: {
        name: "",
        venderCode: ""
      }
    };
  },
  methods: {
    //   axios
    aso(){
         axios({
        url: "/api/main/purchase/pomain/query",
        method: "get",
        params: {poId:this.poId,venderCode:this.venderCode, payType:this.paytype,stateDate:this.value1[0],endDate:this.value1[1],status:this.typ,page:this.page}
      }).then(resp => {
        let list = resp.data;
        this.pagess = list.pages;
        this.arrlist = resp.data.list;
        
      });
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
        this.formor.venderCode = this.resuter[i].venderCode;
      }
    },
    // 供应商
    addgys() {
         (this.dialogFormVisible = true),
        axios.get("/api/main/purchase/vender/all").then(resp => {
          console.log(resp.data, "供应商列表");
          let rest = resp.data;
          this.resuter = rest;
          // this.formor.name = rest;
          // console.log("new",this.formor.name);
        });
    },
    // 确定
    sureadgyx(){
        this.venderCode= this.formor.venderCode
        this.dialogFormVisible = false;
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