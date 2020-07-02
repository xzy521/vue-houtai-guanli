<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <ul class="ulli" v-show="ull">
      <li>
        <p class="pp">产品编号</p>
        <input type="text" class="inputcc" v-model="poId" />
      </li>
      <li>
        <p class="pp">产品名称</p>
        <input type="text" class="inputcc" v-model="name" />
      </li>
      <li>
        <p class="pp">所属分类</p>
        <input type="text" v-model="categoryId" class="inputcc" />
        <i class="el-icon-edit-outline ai" @click="addgys"></i>
      </li>
      <li>
        <el-button type="primary" class="bt" @click="query">查询</el-button>
      </li>
    </ul>
    <!-- 所属产品分类的弹窗 -->
     <el-dialog title="产品分类" :visible.sync="cpdialogFormVisible">
              <el-form :model="formor">
                <el-form-item label="产品分类名" :label-width="formLabelWidth">
                  <el-select v-model="formor.name" placeholder="产品分类名字" @change="handleChange">
                    <el-option
                      v-for="item in resuter"
                      :key="item.categoryId"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="产品分类编号" :label-width="formLabelWidth">
                  <el-input v-model="formor.categoryId" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cpdialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureadgyx">确 定</el-button>
              </div>
            </el-dialog>
    <el-button v-show="sky" @click="adduser">
      <i class="el-icon-circle-plus-outline"></i>添加 
    </el-button>
    <div v-show="sky">
      <el-table
        :data="arrlist"
        stripe
        style="width:100%"
        class="fontab"
        v-loading="loading"
        element-loading-text="拼命加载中"
      >
        <el-table-column label="序号" width="80" type="index">
          <template scope="scope">
            <span>{{ scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品编号" prop="productCode" width="140px"></el-table-column>
        <el-table-column label="产品名称" prop="name" width="140px"></el-table-column>
        <el-table-column label="数量单位" prop="unitName" width="120px"></el-table-column>
        <el-table-column label="分类编号" prop="categoryId" width="120px"></el-table-column>
        <el-table-column label="添加日期" prop="createDate" width="160px"></el-table-column>
        <el-table-column label="销售价" prop="price" width="140px"></el-table-column>
        <el-table-column label="产品描述" prop="remark" width="140px"></el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scouserarr$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加 -->
    <div v-show="!sky">
      <p>新增产品</p>
      <el-form ref="regForm" :label-position="labelPosition" :model="userarr" label-width="100px" :rules="rules">
        <el-form-item label=" 产品编号" prop="productCode" >
          <el-input class="inputc" v-model="userarr.productCode"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="name">
          <el-input class="inputc" v-model="userarr.name"></el-input>
        </el-form-item>
        <el-form-item label="数量单位" prop="unitName">
          <el-input class="inputc" v-model="userarr.unitName"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="categoryId">
        <el-select v-model="userarr.categoryId" placeholder="请选择">
    <el-option
      v-for="item in resuter"
      :key="item.categoryId"
      :label="item.name"
      :value="item.categoryId">
    </el-option>
  </el-select>
          
        </el-form-item>
        <el-form-item label="销售价" prop="price">
          <el-input class="inputc" v-model="userarr.price"></el-input>
        </el-form-item>
        <el-form-item label="添加日期" prop="createDate">
          <el-input class="inputc" v-model="userarr.createDate" disabled></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input class="inputc" v-model="userarr.remark"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click="subimt">提交</el-button>
          <el-button @click="rest">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- xiugai  -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" label-width="120px">
        <el-form-item label="产品编号" :label-width="formLabelWidth" prop="productCode">
          <el-input class="inputc" v-model="form.productCode" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品名称" :label-width="formLabelWidth" prop="name">
          <el-input class="inputc" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量单位" :label-width="formLabelWidth" prop="unitName">
          <el-input class="inputc" v-model="form.unitName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类编号名称" prop="categoryId">
          
           <el-select v-model="form.categoryId" placeholder="请选择">
    <el-option
      v-for="item in resuter"
      :key="item.categoryId"
      :label="item.name"
      :value="item.categoryId">
    </el-option>
  </el-select>
        </el-form-item>
        <el-form-item label="销售价" prop="price">
          <el-input class="inputc" v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="添加日期" prop="createDate">
          <el-input class="inputc" v-model="form.createDate"  autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input class="inputc" v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <p class="red">{{err}}</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cancel">取 消</el-button>
        <!-- dialogFormVisible = false -->
        <el-button type="primary" @click="Certain">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <div v-show="sky">
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
import axios from "axios";
import { requestPost } from "../../axioshttp/index";
export default {
  data() {
    return {
      err: "",
      categoryId:'',
       poId:'',
      name:'',
      ull:'true',
       page:1,
      pagess: "",
      sky: "true",
      arrlist: [],
      resuter:'',
      loading: true,
      labelPosition: "right",
      formor:{
        name:"",
        productCode:''
      },
      userarr: {
        productCode: "",
        name: "",
        unitName: "",
        categoryId: "",
        price: "",
        createDate: new Date().format("yyyy-MM-dd hh:mm:ss"),
        remark: ""
      },
      dialogFormVisible: false,
      cpdialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        productCode: "",
        name: "",
        unitName: "",
        categoryId: "",
        price: "",
        createDate: new Date().format("yyyy-MM-dd hh:mm:ss"),
        remark: ""
      },
      rules:{
        productCode:[
          { required: true, message: '请输入产品编号', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' },
          {pattern:/^[0-9 a-z A-Z]{4,20}$/,message: '长度在 4 到20个数字字母', trigger: 'blur'}
        ],
        name:[
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          {  max: 100 }
        ],
        unitName:[
          { required: true, message: '请输入数量单位', trigger: 'blur' },
        ],
        categoryId:[
          { required: true, message: '请输入分类编号', trigger: 'blur' },
        ],
        price:[
          {required: true, message: '不能为空', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
     // fenye
    chagepage(restpage) {
      this.page = restpage;
      this.aos();
    },
     Cancel() {
       this.err = "";
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    // 查询
    query(){
      axios({
        url:'/api/main/sell/product/show',
        method:'get',
        params:{page:this.page,productCode:this.poId,name:this.name,categoryId:this.categoryId}
      }) .then(resp => {
         let list = resp.data;
         this.pagess = list.pages;
      console.log("256398", resp.data);
      this.arrlist = resp.data.list;
      this.loading = false;
    });
    },
    // 产品分类 下拉框
    addys(){},
    // 确定
    Certain() {
      requestPost("/api/main/sell/product/update", {
        productCode: this.form.productCode,
        name: this.form.name,
        unitName: this.form.unitName,
        categoryId: this.form.categoryId,
        price: this.form.price,
        createDate: this.form.createDate,
        remark: this.form.remark,
      }).then(resp => {
        console.log(resp.data, "123456789788888888888888888888888888");
        if (resp.data.code == 2) {
          this.dialogFormVisible = false;
          this.aos()
        } else {
          this.err = resp.data.message;
        }
      });
    },
    handleEdit(index, row) {
      
      (this.dialogFormVisible = true),
      this.form.productCode = row.productCode,
      this.form.name =row.name,
      this.form.unitName  = row.unitName
      this.form.categoryId = row.categoryId
      this.form.price= row.price
      this.form. createDate = row.createDate
      this.form.remark= row.remark
      console.log(index, row, "111111111");
    },
   handleDelete(index, row) {
      let productCode = row.productCode;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          requestPost("/api/main/sell/product/delete ", {
            productCode : productCode
          }).then(resp => {
            console.log(resp.data);
            if (resp.data.code == 2) {
              this.aos();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$message({
                type: "info",
                message: "删除失败"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      console.log(index, row);
    },
    adduser() {
      this.sky = !this.sky;
      this.ull = !this.ull
      axios({
        url:"/api/main/sell/category/all",
        method:"get",
        params:{}
      }).then(resp=>{
        console.log(resp.data);
        this.resuter = resp.data
      })
      this.userarr ={
        productCode: "",
        name: "",
        unitName: "",
        categoryId: "",
        price: "",
        createDate: new Date().format("yyyy-MM-dd hh:mm:ss"),
        remark: ""
      }
    },
    addgys(){
      console.log("asdassa");
      this.cpdialogFormVisible = true
     
    },
    // 产品分类下拉框
    cpas(){
       axios({
        url:"/api/main/sell/category/all",
        method:"get",
        params:{}
      }).then(resp=>{
        console.log(resp.data);
        this.resuter = resp.data
      })
    },
    // 产品分类下拉框
    handleChange(){
      for (let i = 0; i < this.resuter.length; i++) {
        if (this.resuter[i].name == this.formor.name) {
          break;
        }
        this.formor.categoryId = this.resuter[i].categoryId;
      }
    },
    //产品分类弹窗确定 
    sureadgyx(){
      this.categoryId = this.formor.categoryId
      this.cpdialogFormVisible = false
    },
    subimt() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          requestPost("/api/main/sell/product/add", {
            productCode: this.userarr.productCode,
            name: this.userarr.name,
            unitName: this.userarr.unitName,
            categoryId: this.userarr.categoryId,
            price: this.userarr.price,
            createDate: this.userarr.createDate,
            remark: this.userarr.remark
          }).then(resp => {
            console.log(resp.data);
            if (resp.data.code === 2) {
              this.sky = !this.sky;
              this.ull = !this.ull
            }
          });
          console.log("注册信息合法");
        }
      });
    },
    rest() {
      this.sky = !this.sky;
      this.ull = !this.ull
    },
    aos(){
      //  axios.get("/api/main/sell/product/show")
        axios({
        url:'/api/main/sell/product/show',
        method:'get',
        params:{page:this.page}
      }) .then(resp => {
         let list = resp.data;
         this.pagess = list.pages;
      console.log("256398", resp.data);
      this.arrlist = resp.data.list;
      this.loading = false;
    });
    },
  },
  mounted() {
   this.aos()
   this.cpas()
  }
};
</script>
<style  scoped>
.fontab {
  color: black;
}
.inputc {
  width: 400px;
}
.ulli {
  list-style: none;
  display: flex;
  margin-left: -54px;
}
.ulli li {
  display: flex;
}
.inputcc {
  width: 140px;
  height: 30px;
  margin-top: 10px;
}
.inptcs {
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