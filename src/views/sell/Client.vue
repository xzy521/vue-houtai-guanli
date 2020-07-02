<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <ul class="ulli" v-show="sky">
      <li>
        <p class="pp">客户编号</p>
        <input type="text" class="inputc" v-model="poId" />
      </li>
      <li>
        <p class="pp">客户名称</p>
        <input type="text" v-model="name" class="inputc" />
      </li>
      <li>
        <el-button type="primary" class="bt" @click="query">查询</el-button>
      </li>
    </ul>
    <el-button @click="adduser" type="success">
      <i class="el-icon-circle-plus-outline"></i> 新增
    </el-button>
    <div v-show="sky">
      <el-table :data="arrlist" style="width:100%" element-loading-text="拼命加载中">
        <el-table-column label="序号" width="50" type="index">
          <template scope="scope">
            <span>{{ scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="客户编号" prop="customerCode" width="120px"></el-table-column>
        <el-table-column label="客户名称" prop="name" width="120px"></el-table-column>
        <el-table-column label="联系人" prop="contactor" width="130px"></el-table-column>
        <el-table-column label="地址" prop="address" width="130px"></el-table-column>
        <el-table-column label="邮政编码" prop="postCode" width="120px"></el-table-column>
        <el-table-column label="注册日期" prop="createDate" width="170px"></el-table-column>
        <el-table-column label="电话" prop="tel" width="120px"></el-table-column>
        <el-table-column label="传真" prop="fax" width="120px"></el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <!-- handleEdit(scope.$index, scope.row) dialogFormVisible = true-->
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <!-- 添加 -->
    <div v-show="!sky">
      <el-form
        ref="regForm"
        :label-position="labelPosition"
        :model="userarr"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="客户编号" prop="customerCode">
          <el-input class="ccinputc" v-model="userarr.customerCode" @input="xgmm"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="name">
          <el-input class="ccinputc" v-model="userarr.name"></el-input>
        </el-form-item>
        <el-form-item label="客户密码" prop="passWord">
          <el-input class="ccinputc" v-model="userarr.passWord"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactor">
          <el-input class="ccinputc" v-model="userarr.contactor"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input class="ccinputc" v-model="userarr.address"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postCode">
          <el-input class="ccinputc" v-model="userarr.postCode"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input class="ccinputc" v-model="userarr.tel"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="fax">
          <el-input class="ccinputc" v-model="userarr.fax"></el-input>
        </el-form-item>
        <el-form-item label="注册日期" prop="creareDate">
          <el-input class="ccinputc" disabled v-model="userarr.createDate"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click="subimt">提交</el-button>
          <el-button @click="rest">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="客户编号" prop="customerCode">
          <el-input class="ccinputc" v-model="form.customerCode"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="name">
          <el-input class="ccinputc" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="客户密码" prop="passWord">
          <el-input class="ccinputc" v-model="form.passWord" show-password></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactor">
          <el-input class="ccinputc" v-model="form.contactor"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input class="ccinputc" v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postCode">
          <el-input class="ccinputc" v-model="form.postCode"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input class="ccinputc" v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="fax">
          <el-input class="ccinputc" v-model="form.fax"></el-input>
        </el-form-item>
        <el-form-item label="注册日期" prop="creareDate">
          <el-input class="ccinputc" disabled v-model="form.createDate"></el-input>
        </el-form-item>
      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cancel">取 消</el-button>
        <!-- dialogFormVisible = false -->
        <el-button type="primary" @click="Certain">确 定</el-button>
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
      poId: "",
      name: "",
      arrlist: [],
      labelPosition: "right",
      page: 1,
      pagess: "",
      sky: "true",
      dialogFormVisible:false,
      userarr: {
        customerCode: "",
        name: "",
        passWord: "",
        contactor: "",
        address: "",
        postCode: "",
        createDate: new Date().format("yyyy-MM-dd hh:mm:ss"),
        tel: "",
        fax: ""
      },
      form:{

      },
      rules: {
        customerCode: [
          { required: true, message: "请输入客户编号", trigger: "blur" },
          {
            min: 4,
            max: 20,
            message: "长度在 4 到 20 个数字字母",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输客户名称", trigger: "blur" },
          {
            min: 0,
            max: 100,
            message: "长度在 0 到 100 个数字字母",
            trigger: "blur"
          }
        ],
        passWord: [
          { required: true, message: "请输入客户密码", trigger: "blur" },
          {
            min: 4,
            max: 20,
            message: "长度在 4 到 20 个数字字母",
            trigger: "blur"
          }
        ],
        contactor: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        tel: [{ required: true, message: "请输入电话", trigger: "blur" }]
      }
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
      console.log(this.poId, this.name);
      this.aso();
    },
    // 查询axios
    aso() {
      axios({
        url: "/api/main/sell/customer/show",
        method: "get",
        params: { page: this.page, customerCode: this.poId, name: this.name }
      }).then(resp => {
        let list = resp.data;
        this.pagess = list.pages;
        this.arrlist = resp.data.list;
        console.log(this.arrlist);
      });
    },
    //Xinzeng新增
    adduser() {
      console.log("新增");
      this.sky = false;
    },
    // 修改
    handleEdit(index, row) {
      console.log("xiugai", index, row);
      this.form = row
      console.log(this.form);
      
      this.dialogFormVisible = true
    },
    // 删除
    handleDelete(index, row) {
      console.log("shanchu", index, row);

      requestPost("/api/main/sell/customer/delete", {
        customerCode: row.customerCode
      }).then(resp => {
        console.log(resp.data);
        if (resp.data.code == 2) {
          this.arrlist = resp.data.data;
        }
      });
    },
    // xinzeng 提交
    subimt() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
      requestPost("/api/main/sell/customer/add", this.userarr).then(resp => {
        console.log(resp.data);
        if (resp.data.code == 2) {
          this.aso();
         this.sky = !this.sky
        }
      })}});
    },
    xgmm(){
      this.userarr.passWord = this.userarr.customerCode
    },
    // 取消
    rest() {
      console.log("quxiao ");
      this.sky = true;
    },
    //修改取消
    Cancel(){
      this.dialogFormVisible = false
    },
    // 修改确定
    Certain(){
      requestPost('/api/main/sell/customer/update',this.form).then(resp=>{
        console.log(resp.data);
        if(resp.data.code==2){
          // this.arrlist = resp.data.data
          // this.dialogFormVisible = false
          this.aso()
        }
      })
    }
  },
  mounted(){
    this.aso()
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
.ccinputc {
  width: 600px;
}
</style>