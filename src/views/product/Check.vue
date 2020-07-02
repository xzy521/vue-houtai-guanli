<template>
  <div>
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主界面 -->
    <div v-show="sky">
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
        <el-table-column label="操作" prop width="130px">
          <template slot-scope="scope">
            <span @click="xqbg(scope.$index,scope.row)">盘点</span>
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
    <!-- 盘点 -->
    <div v-show="!sky">
       <p>基本信息</p>
       <el-form ref="regForm" :label-position="labelPosition" :model="userarr" label-width="100px" :rules="rules" >
        <el-form-item label=" 变化数量" prop="num" >
          <el-input class="inputc" v-model="userarr.num"></el-input>
        </el-form-item>
        <el-form-item label=" 变化类型"  >
          <el-select v-model="userarr.type" placeholder="请选择变化类型">
        <el-option label="损耗" value="损耗"></el-option>
        <el-option label="盈余" value="盈余"></el-option>
      </el-select>
        </el-form-item>
        <el-form-item label=" 损益原因" prop="description" >
          <el-input class="inputc" v-model="userarr.description"></el-input>
        </el-form-item>
        <el-button type="primary" @click="Certain">确 定</el-button>
        <el-button @click="Cancel">取 消</el-button>
         </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { requestPost } from "../../axioshttp/index";
import { requestPostJson } from "../../axioshttpjson/index";
export default {
  data() {
    return {
      page: 1,
      pagess: "",
      sky:true,
      arrlist: [],
      labelPosition:"right",
      productCode:'',
      originNum:'',
      userarr:{
          num:'',
          type:'',
          description:"",
      },
      rules:{
          num:[
              { required: true, message: '请输入变化数量', trigger: 'blur' },
          ],
          description:[
              {required: true, message: '请输入变化原因', trigger: 'blur'}
          ]
      }
    };
  },
  methods: {
    //   pandian取消
    Cancel(){
        this.sky=!this.sky
    },
    // 盘点确定
    Certain(){
        this.userarr["originNum"] = this.originNum
        this.userarr["productCode"] = this.productCode
        this.$refs.regForm.validate(valid => {
        if (valid) {
        requestPost("/api/main/stock/checkstock",{productCode:this.userarr.productCode,
        originNum:this.userarr.originNum,
        num:this.userarr.num,
        type:this.userarr.type,
        description:this.userarr.description}).then(resp=>{
            if(resp.data.code==2){
              this.sky = !this.sky
                this.aso()
            }
            console.log(resp.data);
            
        })
        }
        })
        console.log(this.userarr);
        
        
    },
      // fenye
    chagepage(restpage) {
      this.page = restpage;
      this.aso();
    },
    // 盘点
    xqbg(index, row) {
      console.log(row);
      this.sky = !this.sky
      this.productCode = row.productCode
      this.originNum = row.num
    },
    aso(){
        axios({
        url: "/api/main/sell/product/show",
        method: "get",
        params: { page: this.page,}
      }).then(resp => {
        let list = resp.data;
        this.pagess = list.pages;
    
        this.arrlist = resp.data.list;
        this.loading = false;
      });
    }
  },
  mounted(){
      this.aso()
  }
};
</script>
<style  scoped>
.inputc {
  width: 400px;
}
</style>