<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <p>1{{userarr.createDate|date}}</p> -->
    <el-button @click="adduser" v-show="sky" class="bthend">
      <i class="el-icon-circle-plus-outline"></i> 添加
    </el-button>
    <div v-show="sky">
      <el-table
        :data="tablelist"
        style="width:100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
      >
        <el-table-column label="序号" width="50" type="index">
          <template scope="scope">
            <span>{{ scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户账号" prop="account" width="120px"></el-table-column>
        <el-table-column label="用户姓名" prop="name" width="120px"></el-table-column>
        <el-table-column label="添加日期" prop="createDate" width="180px"></el-table-column>
        <el-table-column label="锁定状态" width="120px" prop="status">
          <template slot-scope="scope">
            <span>{{scope.row.status|dt}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="锁定状态" width="120px" v-else>{{sdd}}</el-table-column> -->
        <el-table-column label="用户权限列表" width="390px" prop="models">
          <template slot-scope="scope">
            <span v-for="item in scope.row.models">{{item.modelName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- handleEdit(scope.$index, scope.row) dialogFormVisible = true-->
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="!sky">
      <p>基本信息</p>
      <el-form
        ref="regForm"
        :label-position="labelPosition"
        :model="userarr"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="用户账号" prop="account">
          <el-input class="inputc" v-model="userarr.account" @input="xgmm"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="name">
          <el-input class="inputc" v-model="userarr.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input class="inputc" v-model="userarr.password"></el-input>
        </el-form-item>
        <el-form-item label="添加日期" prop="creareDate">
          <el-input class="inputc" disabled v-model="userarr.createDate"></el-input>
        </el-form-item>
        <el-form-item label="锁定状态" prop="status">
          <el-radio v-model="userarr.status" label="1">是</el-radio>
          <el-radio v-model="userarr.status" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="权限" prop="modelcodes">
          <el-checkbox-group v-model="userarr.modelcodes">
            <el-checkbox v-for="(item,index) in asds" :label="index+1" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click="subimt">提交</el-button>
          <el-button @click="rest">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 编辑 -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="regForm">
        <el-form-item label="用户账号" :label-width="formLabelWidth" prop="account">
          <el-input v-model="form.account" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" autocomplete="off" show-password></el-input>
        </el-form-item>

        <el-form-item label="添加日期" prop="creareDate">
          <el-input class="inputc" disabled v-model="form.createDate"></el-input>
        </el-form-item>
        <el-form-item label="锁定状态" prop="status">
          <!-- <el-radio v-model="form.status" :label='form.status' v-if="form.status==1">是</el-radio> -->
          <el-radio v-model="form.status" label="1">是</el-radio>
          <el-radio v-model="form.status" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="权限" prop="modelcodes">
          <el-checkbox-group v-model="form.modelcodes">
            <el-checkbox label="1">系统管理</el-checkbox>
            <el-checkbox label="2">采购</el-checkbox>
            <el-checkbox label="3">销售</el-checkbox>
            <el-checkbox label="4">仓管</el-checkbox>
            <el-checkbox label="5">财务</el-checkbox>
            <el-checkbox label="6">报表</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
        </el-form-item>-->
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
      loading: true,
      sd: "否",
      sdd: "是",
      tablelist: [],
      page: 1,
      err: "",
      islock: "",
      pagess: "",
      sky: "true",
      labelPosition: "right",
      asds: ["系统管理员", "采购", "销售", "仓管", "财务", "报表"],
      asdsfz: ["采购", "销售", "系统管理员", "财务", "仓管", "报表"],
      // time:new Date().toLocaleString(),
      qx: {},
      userarr: {
        account: "",
        name: "",
        password: "",
        createDate: new Date().format("yyyy-MM-dd hh:mm:ss"),
        status: "0",
        modelcodes: []
      },
      dialogFormVisible: false,
      form: {
        account: "",
        name: "",
        password: "",
        createDate: new Date().format("yyyy-MM-dd hh:mm:ss"),
        status: "0",
        modelcodes: []
      },
      formLabelWidth: "120px",
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        name: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        modelcodes: [{ required: true, message: "请勾选权限", trigger: "blur" }]
      }
    };
  },
  filters: {
    dt(vale) {
      if (vale === 1) {
        return "是";
      } else if (vale === 0) {
        return "否";
      }
    }
  },
  methods: {
    // fenye
    chagepage(restpage) {
      this.page = restpage;
      this.aos();
    },
    // 账号密码一样
    xgmm() {
      this.userarr.password = this.userarr.account;
    },
    handleEdit(index, row) {
      console.log(row);

      (this.dialogFormVisible = true),
        (this.form.account = row.account),
        (this.form.name = row.name),
        (this.form.password = row.passWord),
        (this.form.status = row.status.toString());

      // 重点不对
      let arr = [];
      
      for (let item of row.models) {
        console.log(item, "777");
        arr.push(item.modelCode.toString());
      }

      this.form.modelcodes = [...arr];
      console.log(this.form.modelcodes, "66666");
    },
    // queding
    Certain() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          requestPost("/api/main/system/user/update", {
            account: this.form.account,
            name: this.form.name,
            passWord: this.form.password,
            createDate: this.form.createDate,
            status: this.form.status,
            modelcodes: this.form.modelcodes
          }).then(resp => {
            console.log(resp.data, "123456789788888888888888888888888888");
            if (resp.data.code == 2) {
              this.dialogFormVisible = false;
              this.aos();
            } else {
              this.err = resp.data.message;
            }
          });
        }
      });
    },
    // 取消
    Cancel() {
      this.err = "";
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    handleDelete(index, row) {
      let account = row.account;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          requestPost("/api/main/system/user/delete", {
            account: account
          }).then(resp => {
            console.log(resp.data);
            this.aos();
          }),
            this.$message({
              type: "success",
              message: "删除成功!"
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
    },
    subimt() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          requestPost("/api/main/system/user/add", {
            account: this.userarr.account,
            name: this.userarr.name,
            passWord: this.userarr.password,
            createDate: this.userarr.createDate,
            status: this.userarr.status,
            modelcodes: this.userarr.modelcodes
          }).then(resp => {
            this.sky = !this.sky;
            this.aos();
          });
          console.log("注册信息合法");
        }
      });
    },
    rest() {
      this.sky = !this.sky;
    },
    aos() {
      axios({
        url: "/api/main/system/user/show",
        method: "get",
        params: { page: this.page }
      }).then(resp => {
        let list = resp.data;
        this.tablelist = list.list;
        this.loading = false;
        this.pagess = list.pages;
      });
    }
  },

  mounted() {
    this.aos();
  }
};
</script>
<style  scoped>
.inputc {
  width: 600px;
}
.red {
  color: red;
}
.bthend {
  margin-top: 15px;
}
</style>