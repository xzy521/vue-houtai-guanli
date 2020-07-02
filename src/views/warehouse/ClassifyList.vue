<template>
  <div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <!-- <p>1{{userarr.createDate|date}}</p> -->

    <el-button v-show="sky" @click="adduser" class="bthend">
      <i class="el-icon-circle-plus-outline"></i> 添加
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
        <el-table-column label="序号" width="160" type="index">
          <template scope="scope">
            <span>{{ scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类序号ID" prop="categoryId" width="300px"></el-table-column>
        <el-table-column label="产品类别名" prop="name" width="300px"></el-table-column>
        <el-table-column label="描述" prop="remark" width="220px"></el-table-column>
        <el-table-column label="操作" width="220px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加页面 -->
    <div v-show="!sky">
      <p>新增产品分类</p>
      <el-form
        ref="regForm"
        :label-position="labelPosition"
        :model="userarr"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="产品类名" prop="name">
          <el-input class="inputc" v-model="userarr.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input class="inputc" v-model="userarr.remark"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click="subimt">提交</el-button>
          <el-button @click="rest">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 编辑 -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="分类序号ID" :label-width="formLabelWidth" prop="categoryId">
          <el-input v-model="form.categoryId" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品类别名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" prop="remark">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
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
      page: 1,
      pagess: "",
      loading: true,
      arrlist: [],
      labelPosition: "right",
      sky: "true",
      userarr: {
        name: "",
        remark: ""
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        categoryId: "",
        name: "",
        remark: ""
      },
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }]
        // categoryId:[{ required: true, message: "分类序列号", trigger: "blur"}],
      }
    };
  },
  methods: {
    // 分页
    chagepage(restpage) {
      this.page = restpage;
      this.aos();
    },
    // 取消
    Cancel() {
      this.err = "";
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    // 确定
    Certain() {
      requestPost("/api/main/sell/category/update", {
        categoryId: this.form.categoryId,
        name: this.form.name,
        remark:this.form.remark
      }).then(resp => {
        console.log(resp.data, "123456789788888888888888888888888888");
        if (resp.data.code == 2) {
          this.dialogFormVisible = false;
          // this.$router.go(0);
          this.aos()
        } else {
          this.err = resp.data.message;
        }
      });
    },
    handleEdit(index, row) {
      (this.dialogFormVisible = true),
        (this.form.categoryId = row.categoryId),
        (this.form.name = row.name),
        (this.form.remark = row.remark);
      console.log(index, row, "111111111");
    },
    handleDelete(index, row) {
      let categoryId = row.categoryId;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          requestPost("/api/main/sell/category/delete ", {
            categoryId: categoryId
          }).then(resp => {
            console.log(resp.data);
            if (resp.data.code == 2) {
             this.arrlist = resp.data.data
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
    },
    subimt() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          requestPost("/api/main/sell/category/add", {
            name: this.userarr.name,
            remark: this.userarr.remark
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

    aos() {
      // axios.get('/api/main/sell/category/show',{page:this.page})
      axios({
        url: "/api/main/sell/category/show",
        method: "get",
        params: { page: this.page }
      }).then(resp => {
        let list = resp.data;
        this.arrlist = resp.data.list;
        this.loading = false;
        console.log(list, "6666");
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
.fontab {
  color: black;
}
.inputc {
  width: 400px;
}
.bthend{
  margin-top: 10px;
}
</style>