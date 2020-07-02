<template>
  <div>
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>采购管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button v-show="sky" @click="adduser" class="bthend">
      <i class="el-icon-circle-plus-outline"></i> 添加
    </el-button>
    <div >
      <el-table :data="arrlist" stripe style="width:100%" class="fontab" v-show="sky" v-loading="loading"
        element-loading-text="拼命加载中" >
        <el-table-column label="序号" width="60" type="index">
          <template scope="scope">
            <span>{{ scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="供应商编号" prop="venderCode" width="140px"></el-table-column>
        <el-table-column label="供应商名称" prop="name" width="140px"></el-table-column>
        <el-table-column label="联系人" prop="contactor" width="100px"></el-table-column>
        <el-table-column label="地址" prop="address" width="120px"></el-table-column>
        <el-table-column label="添加日期" prop="createDate" width="160px"></el-table-column>
        <el-table-column label="邮政编码" prop="postCode" width="110px"></el-table-column>
        <el-table-column label="电话" prop="tel" width="140px"></el-table-column>
        <el-table-column label="传真" prop="fax" width="100px"></el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- tianjia  -->
     <div v-show="!sky">
      <p>新增产品</p>
      <el-form ref="regForm" :label-position="labelPosition" :model="userarr" label-width="100px" :rules="rules">
        <el-form-item label=" 供应商编号" prop="venderCode" >
          <el-input class="inputc" v-model="userarr.venderCode"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" prop="name">
          <el-input class="inputc" v-model="userarr.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input class="inputc" v-model="userarr.passWord"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactor">
          <el-input class="inputc" v-model="userarr.contactor"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input class="inputc" v-model="userarr.address"></el-input>
        </el-form-item>
        <el-form-item label="添加日期" prop="createDate">
          <el-input class="inputc" v-model="userarr.createDate" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postCode">
          <el-input class="inputc" v-model="userarr.postCode" ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input class="inputc" v-model="userarr.tel"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="fax">
          <el-input class="inputc" v-model="userarr.fax"></el-input>
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
        <el-form-item label="供应商编号" :label-width="formLabelWidth" prop="venderCode">
          <el-input class="inputc" v-model="form.venderCode" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" :label-width="formLabelWidth" prop="name">
          <el-input class="inputc" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="passWord">
          <el-input class="inputc" v-model="form.passWord" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="联系人"  :label-width="formLabelWidth" prop="contactor">
          <el-input class="inputc" v-model="form.contactor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input class="inputc" v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="添加日期" :label-width="formLabelWidth" prop="createDate">
          <el-input class="inputc" v-model="form.createDate" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" :label-width="formLabelWidth" prop="postCode">
          <el-input class="inputc" v-model="form.postCode" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="tel">
          <el-input class="inputc" v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="传真" :label-width="formLabelWidth" prop="fax">
          <el-input class="inputc" v-model="form.fax" autocomplete="off"></el-input>
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
    <div>
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
      sky: "true",
      page: 1,
      pagess: "",
      arrlist: [],
       labelPosition: "right",
      loading: true,
      userarr: {
        venderCode: "",
        name: "",
        passWord:'',
        contactor:'',
        address:'',
        categoryId: "",
        postCode:'',
        tel:'',
        fax:'',
        createDate: new Date().format("yyyy-MM-dd hh:mm:ss"),
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        venderCode: "",
        name: "",
        passWord:'',
        contactor:'',
        address:'',
        categoryId: "",
        postCode:'',
        tel:'',
        fax:'',
        createDate: new Date().format("yyyy-MM-dd hh:mm:ss"),
      },
       rules:{
        venderCode:[
          { required: true, message: '供应商编号', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到20个', trigger: 'blur' },
          {pattern:/^[0-9 a-z A-Z]{4,20}$/,message: '长度在 4 到20个数字字母', trigger: 'blur'}
        ],
        name:[
          { required: true, message: '请输入供应商名称', trigger: 'blur' },
          {  max: 100 }
        ],
        passWord:[
          { required: true, message: '请输入数量单位', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 3 到20个字符', trigger: 'blur' }
        ],
        contactor :[
          { required: true, message: '请输入联系人', trigger: 'blur' },
        ],
        tel:[
          {required: true, message: '请输入电话', trigger: 'blur' }
        ],
        address:[
          {required: true, message: '不能为空', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    // fenye
    chagepage(restpage) {
      this.page = restpage;
      this.aso();
    },
    handleEdit(index, row) {
      (this.dialogFormVisible = true),
      this.form.venderCode = row.venderCode ,
      this.form.name = row.name,
      this.form.passWord= row.passWord,
      this.form.contactor= row.contactor,
      this.form.address= row.address ,
      this.form.categoryId= row.categoryId,
      this.form.postCode= row.postCode,
      this.form.tel = row.tel,
      this.form.fax = row.fax,
      this.form.createDate = row.createDate,
      console.log(index, row, "111111111");
    },
     Cancel() {
       this.err = "";
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    // 确定
    Certain() {
      requestPost("/api/main/purchase/vender/update", {
        venderCode: this.form.venderCode,
        name: this.form.name,
        passWord: this.form.passWord,
        address: this.form.address,
        contactor: this.form.contactor,
        createDate: this.form.createDate,
        postCode: this.form.postCode,
        tel: this.form.tel,
        fax: this.form.fax,
      }).then(resp => {
        if (resp.data.code == 2) {
          this.dialogFormVisible = false;
          this.aso()
        } else {
          this.err = resp.data.message;
        }
      });
    },
    handleDelete(index, row) {
      let venderCode = row.venderCode;
      console.log(venderCode);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          requestPost("/api/main/purchase/vender/delete", {
            venderCode: venderCode
          }).then(resp => {
            console.log(resp.data);
            if (resp.data.code == 2) {
              
              this.aso()
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
        .catch(err => {
          console.log(err);

          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      console.log(index, row);
    },
     adduser() {
      this.sky = !this.sky;
    },
    subimt() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          requestPost("/api/main/purchase/vender/add", {
            venderCode: this.userarr.venderCode,
            name: this.userarr.name,
            passWord: this.userarr.passWord,
            contactor: this.userarr.contactor,
            address: this.userarr.address,
            createDate: this.userarr.createDate,
            postCode: this.userarr.postCode,
            tel : this.userarr.tel, 
            fax: this.userarr.fax, 
          }).then(resp => {
            console.log(resp.data);
            if (resp.data.code === 2) {
              this.sky = !this.sky;
            }
          });
          console.log("注册信息合法");
        }
      });
    },
    rest() {
      this.sky = !this.sky;
    },
    aso() {
      // axios.get("/api/main/purchase/vender/all")
      axios({
        url: "/api/main/purchase/vender/show",
        method: "get",
        params: { page: this.page }
      }).then(resp => {
        let list = resp.data;
        this.pagess = list.pages;
        console.log("256398", resp.data);
        this.arrlist = resp.data.list;
        this.loading = false;
      });
    }
  },
  mounted() {
    this.aso();
  }
};
</script>
<style  scoped>
.fontab {
  color: black;
  font-size: 14px;
}
.inputc {
  width: 400px;
}
.bthend{
  margin-top: 10px;
}
</style>