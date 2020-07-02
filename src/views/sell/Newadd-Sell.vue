<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <ul class="ulli" v-show="sky">
      <li>
        <p class="pp">销售单编号</p>
        <input type="text" class="inputc" v-model="soId" />
      </li>
      <li>
        <p class="pp">客户编号</p>
        <input type="text" class="inputc" v-model="customerCode" />
      </li>
      <li>
        <p class="pp">处理状态</p>
        <select class="inputc" v-model="status">
          <option value="1">货到付款</option>
          <option value="2">款到发货</option>
          <option value="3">预付款到发货</option>
        </select>
      </li>
    </ul>
    <ul class="ulli" v-show="sky">
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
        <el-button type="primary" class="bt" @click="query">查询</el-button>
      </li>
    </ul>
    <!-- 主界面 -->
    <el-button @click="adduser" v-show="sky">
      <i class="el-icon-circle-plus-outline"></i> 添加
    </el-button>
    <div v-show="sky">
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
        <el-table-column label="销售单编号" prop="soId" width="140px">
          <template slot-scope="scope">
            <span style="display:flex">
              <el-input type="text" v-model="scope.row.soId" style="width:120px" disabled></el-input>
              <span class="el-icon-question ico" @click="mxcp(scope.$index, scope.row)"></span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="140px"></el-table-column>
        <el-table-column label="客户名称" prop="customerCode" width="100px"></el-table-column>
        <el-table-column label="创建用户" prop="account" width="120px"></el-table-column>
        <el-table-column label="附加费用" prop="tipFee" width="100px"></el-table-column>
        <el-table-column label="产品总价" prop="productTotal" width="110px"></el-table-column>
        <el-table-column label="销售单总价格" prop="soTotal" width="100px"></el-table-column>
        <el-table-column label="付款方式" prop="payType" width="100px">
          <template slot-scope="scope">
            <span>{{scope.row.payType|requer}}</span>
          </template>
        </el-table-column>
        <el-table-column label="最低付款金额" prop="prePayFee" width="100px"></el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
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
    <!-- 新增添加销售单 -->
    <div v-show="!xzsky">
      <form>
        <el-button type="success" @click="addmx">
          <i class="el-icon-circle-plus-outline"></i>
          增加销售明细
        </el-button>
        <el-button type="primary" @click="save">
          <i class="el-icon-document"></i>
          保存
        </el-button>
        <el-button type="danger" @click="xqbc">
          <i class="el-icon-circle-close"></i>
          取消
        </el-button>
        <table class="addmx">
          <tr style="border-bottom:none">
            <td>销售单编号</td>
            <td>
              <input type="text" v-model="form.soId" class="inputc bgcinput" disabled />
            </td>
          </tr>
          <tr style="border-bottom:none">
            <td>创建时间</td>
            <td>
              <input type="text" v-model="form.createTime" class="inputc bgcinput" disabled />
            </td>
          </tr>
          <tr style="border-bottom:none">
            <td>客户编号</td>
            <td>
              <input type="text" v-model="form.customerCode" disabled class="inputc bgcinput" />
            </td>
            <td @click="addgys">
              <i class="el-icon-edit-outline"></i>
            </td>

            <el-dialog title="客户编号" :visible.sync="addgysdialogFormVisible">
              <el-table :data="resuter" stripe style="width:100%" class="fontab">
                <el-table-column label="序号" width="100" type="index">
                  <template scope="scope">
                    <span>
                      <el-radio
                        v-model="radio"
                        :label="scope.$index"
                        @change="handleChange(scope.$index,scope.row)"
                      ></el-radio>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="客户名称" prop="name" width="200px"></el-table-column>
                <el-table-column label="客户编号" prop="customerCode" width="200px"></el-table-column>
              </el-table>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addgysdialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureadgyx">确 定</el-button>
              </div>
            </el-dialog>
          </tr>
          <tr style="border-bottom:none;border-top:none;background-color: #F5F8FA;">
            <td>创建用户</td>
            <td>
              <input type="text" v-model="account" class="inputc bgcinput" disabled />
            </td>
          </tr>
          <tr style="border-bottom:none;border-top:none;background-color: #F5F8FA;">
            <td>附加费用</td>
            <td>
              <input type="text" v-model="form.tipFee" @input="jsz" class="inputc" />
            </td>
          </tr>
          <tr style="border-bottom:none;border-top:none;background-color: #F5F8FA;">
            <td>产品总价</td>
            <td>
              <input type="text" v-model="form.productTotal" disabled class="inputc bgcinput" />
            </td>
          </tr>
          <tr style=" border-top:none">
            <td>付款方式</td>
            <td>
              <el-select v-model="form.payType" placeholder="请选择付款方式" @change="payf">
                <el-option label="货到付款" value="1"></el-option>
                <el-option label="款到发货" value="2"></el-option>
                <el-option label="预付款到发货" value="3"></el-option>
              </el-select>
            </td>
          </tr>
          <tr style="border-top:none">
            <td>销售总价</td>
            <td>
              <input type="text" v-model="form.soTotal" disabled class="inputc bgcinput" />
            </td>
          </tr>
          <tr style="border-top:none">
            <td>最低付款金额</td>
            <td>
              <input type="text" v-model="form.prePayFee" class="inputc bgcinput" :disabled = "disable" />
            </td>
          </tr>
          <tr style=" border-top:none">
            <td>备注</td>
            <td>
              <input type="text" v-model="form.remark" class="inputc" />
            </td>
          </tr>
        </table>
      </form>
    </div>
    <!-- 销售单明细  弹窗-->
    <el-dialog title="销售单明细" :visible.sync="dialogFormVisible">
      <el-table
        :data="sellmx"
        stripe
        style="width:100%"
        class="fontab"
        element-loading-text="拼命加载中"
      >
        <el-table-column label="产品编号" prop="soId" width="140px"></el-table-column>
        <el-table-column label="产品名称" prop="productCode" width="100px"></el-table-column>
        <el-table-column label="单价明细" prop="unitPrice" width="120px"></el-table-column>
        <el-table-column label="数量" prop="num" width="100px"></el-table-column>
        <el-table-column label="数量单位" prop="unitName" width="100px"></el-table-column>
        <el-table-column label="产品总价" prop="itemPrice" width="100px"></el-table-column>
        <el-table-column label="产品名称" prop="productName" width="100px"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 销售明细 -->
    <div v-show="cpmxsky">
      <el-table
        :data="poitems"
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
        <el-table-column label="产品选择" prop="productCode" width="200px">
          <template slot-scope="scope">
            <span>
              <input type="text" v-model="scope.row.productCode" class="bgcinput" disabled />
            </span>
            <span>
              <i class="el-icon-edit-outline" @click="cpxz(scope.$index,scope.row)"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="产品单价" prop="unitPrice" width="140px">
          <template slot-scope="scope">
            <span>
              <input
                type="text"
                v-model="scope.row.unitPrice"
                disabled
                class="bgcinput"
                @input="pkuy(scope.$index,scope.row)"
              />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="数量单位" prop="unitName" width="140px">
          <template slot-scope="scope">
            <span>
              <input type="text" v-model="scope.row.unitName" class="bgcinput" disabled />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" prop="name" width="200px">
          <template slot-scope="scope">
            <span>
              <input type="text" v-model="scope.row.name" class="bgcinput" disabled />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="产品数量" prop="num" width="200px">
          <template slot-scope="scope">
            <span>
              <input type="text" v-model="scope.row.num" @input="pkuy(scope.$index,scope.row)" />
            </span>
          </template>

          <!-- <i class="el-icon-success" @click="ppkli"></i> -->
        </el-table-column>
        <el-table-column label="明细总价" prop="itemPrice" width="180px">
          <template slot-scope="scope">
            <span>
              <input type="text" v-model="scope.row.itemPrice" />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteasd(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="产品选择" :visible.sync="dv">
        <el-table :data="cprest" stripe style="width:100%" class="fontab">
          <el-table-column label="序号" width="100" type="index">
            <template scope="scope">
              <span>
                <el-radio
                  v-model="radio"
                  :label="scope.$index"
                  @change="cphandleChange(scope.$index,scope.row)"
                ></el-radio>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" prop="name" width="140px"></el-table-column>
          <el-table-column label="产品编号" prop="productCode" width="140px"></el-table-column>
          <el-table-column label="产品单价" prop="price" width="140px"></el-table-column>
          <el-table-column label="数量单位" prop="unitName" width="140px"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer" width="200px">
          <el-button @click="dv = false">取 消</el-button>
          <el-button type="primary" @click="sureyxfz">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 修改 -->
    <div v-show="xgsky">
      <p>修改</p>
      <form>
        <el-button type="success" @click="addmxxg">
          <i class="el-icon-circle-plus-outline"></i>
          增加销售明细
        </el-button>
        <el-button type="primary" @click="savexg">
          <i class="el-icon-document"></i>
          保存
        </el-button>
        <el-button type="danger" @click="xqbc">
          <i class="el-icon-circle-close"></i>
          取消
        </el-button>
        <table class="addmx">
          <tr style="border-bottom:none">
            <td>销售单编号</td>
            <td>
              <input type="text" v-model="formxg.soId" class="inputc bgcinput" disabled />
            </td>
          </tr>
          <tr style="border-bottom:none">
            <td>创建时间</td>
            <td>
              <input type="text" v-model="formxg.createTime" class="inputc bgcinput" disabled />
            </td>
          </tr>
          <tr style="border-bottom:none">
            <td>客户编号</td>
            <td>
              <input type="text" v-model="formxg.customerCode" disabled class="inputc bgcinput" />
            </td>
            <td @click="addgysxg">
              <i class="el-icon-edit-outline"></i>
            </td>

            <el-dialog title="客户编号" :visible.sync="xgaddgysdialogFormVisible">
              <el-table :data="resuterxg" stripe style="width:100%" class="fontab">
                <el-table-column label="序号" width="100" type="index">
                  <template scope="scope">
                    <span>
                      <el-radio
                        v-model="radio"
                        :label="scope.$index"
                        @change="handleChangexg(scope.$index,scope.row)"
                      ></el-radio>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="客户名称" prop="name" width="200px"></el-table-column>
                <el-table-column label="客户编号" prop="customerCode" width="200px"></el-table-column>
              </el-table>
              <div slot="footer" class="dialog-footer">
                <el-button @click="xgaddgysdialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureadgyxxg">确 定</el-button>
              </div>
            </el-dialog>
          </tr>
          <tr style="border-bottom:none;border-top:none;background-color: #F5F8FA;">
            <td>创建用户</td>
            <td>
              <input type="text" v-model="account" class="inputc bgcinput" disabled />
            </td>
          </tr>
          <tr style="border-bottom:none;border-top:none;background-color: #F5F8FA;">
            <td>附加费用</td>
            <td>
              <input type="text" v-model="formxg.tipFee" @input="jszxg" class="inputc" />
            </td>
          </tr>
          <tr style="border-bottom:none;border-top:none;background-color: #F5F8FA;">
            <td>产品总价</td>
            <td>
              <input type="text" v-model="formxg.productTotal" disabled class="inputc bgcinput" />
            </td>
          </tr>
          <tr style=" border-top:none">
            <td>付款方式</td>
            <td>
              <el-select v-model="formxg.payType" placeholder="请选择付款方式" @change="xgpayf">
                <el-option label="货到付款" value="1"></el-option>
                <el-option label="款到发货" value="2"></el-option>
                <el-option label="预付款到发货" value="3"></el-option>
              </el-select>
            </td>
          </tr>
          <tr style="border-top:none">
            <td>销售总价</td>
            <td>
              <input type="text" v-model="formxg.soTotal" disabled class="inputc bgcinput" />
            </td>
          </tr>
          <tr style="border-top:none">
            <td>最低付款金额</td>
            <td>
              <input type="text" v-model="formxg.prePayFee" class="inputc bgcinput" :disabled = "xgdisable" />
            </td>
          </tr>
          <tr style=" border-top:none">
            <td>备注</td>
            <td>
              <input type="text" v-model="formxg.remark" class="inputc" />
            </td>
          </tr>
        </table>
      </form>
    </div>
    <!-- 修改销售明细 -->
    <div v-show="xgcpxky">
      <el-table
        :data="poitemsxg"
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
        <el-table-column label="产品选择" prop="productCode" width="200px">
          <template slot-scope="scope">
            <span>
              <input type="text" v-model="scope.row.productCode" class="bgcinput" disabled />
            </span>
            <span>
              <i class="el-icon-edit-outline" @click="cpxzxg(scope.$index,scope.row)"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" prop="productName" width="140px">
          <template slot-scope="scope">
            <span>
              <input type="text" v-model="scope.row.productName" class="bgcinput" disabled />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="产品单价" prop="unitPrice" width="140px">
          <template slot-scope="scope">
            <span>
              <input
                type="text"
                v-model="scope.row.unitPrice"
                disabled
                class="bgcinput"
                @input="pkuyxg(scope.$index,scope.row)"
              />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="数量单位" prop="unitName" width="140px">
          <template slot-scope="scope">
            <span>
              <input type="text" v-model="scope.row.unitName" class="bgcinput" disabled />
            </span>
          </template>
        </el-table-column>

        <el-table-column label="产品数量" prop="num" width="140px">
          <template slot-scope="scope">
            <span>
              <input type="text" v-model="scope.row.num" @input="pkuyxg(scope.$index,scope.row)" />
            </span>
          </template>

          <!-- <i class="el-icon-success" @click="ppkli"></i> -->
        </el-table-column>
        <el-table-column label="明细总价" prop="itemPrice" width="180px">
          <template slot-scope="scope">
            <span>
              <input type="text" v-model="scope.row.itemPrice" />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteasdxg(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改明细弹窗 -->
      <el-dialog title="产品选择" :visible.sync="dvxg">
        <el-table :data="cprestxg" stripe style="width:100%" class="fontab">
          <el-table-column label="序号" width="100" type="index">
            <template scope="scope">
              <span>
                <el-radio
                  v-model="radio"
                  :label="scope.$index"
                  @change="cphandleChangexg(scope.$index,scope.row)"
                ></el-radio>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" prop="name" width="140px"></el-table-column>
          <el-table-column label="产品编号" prop="productCode" width="140px"></el-table-column>
          <el-table-column label="产品单价" prop="price" width="140px"></el-table-column>
          <el-table-column label="数量单位" prop="unitName" width="140px"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer" width="200px">
          <el-button @click="dvxg = false">取 消</el-button>
          <el-button type="primary" @click="sureyxfzxg">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
import { requestPost } from "../../axioshttp/index";
import { requestPostJson } from "../../axioshttpjson/index";
export default {
  data() {
    return {
      soId: "",
      page: 1,
      pagess: "",
      value1: "",
      status: "",
      customerCode: "",
      arrlist: [],
      cpmxsky: false,
      xgsky: false,
      xgcpxky: false,
      sellmx: [],
      cprest: [],
      index: "",
      cpindex: "",
      cprestxg: [],
      disable:true,
      xgdisable:true,
      dv: false,
      dvxg: false,
      dialogFormVisible: false,
      addgysdialogFormVisible: false,
      xgaddgysdialogFormVisible: false,
      sky: "true",
      xzsky: "true",
      formLabelWidth: "120px",
      resuter: [],
      radio: "",
      radioo: "",
      radioomx: "",
      radioomxxg: "",
      radiooxg: "",
      resuterxg: [],
      newlist: {
        productCode: "",
        unitPrice: "",
        unitName: ""
      },
      newlistxg: {
        productCode: "",
        unitPrice: "",
        unitName: ""
      },
      form: {
        soId: new Date().format("yyyyMMddhhmmss"),
        createTime: new Date().format("yyyy-MM-dd hh:mm:ss"),
        customerCode: "",
        tipFee: 0,
        productTotal: "",
        soTotal: "",
        payType: "",
        prePayFee: 0,
        status: 1,
        remark: ""
      },
      formxg: {},
      poitems: [],
      poitemsxg: [],
      formor: {
        name: "",
        customerCode: ""
      },
      formorxg: {
        name: "",
        customerCode: ""
      }
    };
  },
  computed: {
    ...mapState(["user"]),
    account: {
      get() {
        return this.$store.state.user.account;
      },
      set(value) {
        this.$store.commit("updateAccount", value);
      }
    }
  },
  mutations: {
    updateAccount(state, account) {
      state.user.account = account;
    }
  },
  methods: {
    // fenye
    chagepage(restpage) {
      this.page = restpage;
      this.aso();
    },
    //   销售单明细
    mxcp(index, row) {
      this.dialogFormVisible = true;
      axios({
        url: "/api/main/sell/somain/queryItem",
        method: "get",
        params: { soId: row.soId }
      }).then(resp => {
        this.sellmx = resp.data;
      });
    },
    //   查询
    query() {
      axios
        .get("/api/main/sell/somain/query", {
          soId: this.soId,
          customerCode: this.customerCode,
          status: this.status,
          startDate: this.value1[0],
          endDate: this.value1[1],
          page: this.page
        })
        .then(resp => {
          console.log(resp.data);
          this.arrlist = resp.data.list;
          this.pagess = resp.data.pages;
        });
    },
    // 主界面的修改
    handleEdit(index, row) {
      console.log(row);
      this.sky = false;
      this.xgsky = true;
      this.formxg = row;
      this.xgcpxky = true;
      requestPost("/api/main/sell/somain/queryItem", { soId: row.soId }).then(
        resp => {
          //   console.log(resp.data);
          this.poitemsxg = resp.data;
          console.log(this.poitemsxg, "55555555");
        }
      );
    },
    // 取消
    xqbc(){
      this.xzsky = true;
          this.sky = true;
          (this.cpmxsky = false),
            (this.xgsky = false),
            this.xgcpxky = false
    },
    // addgys
    addgys() {
      this.addgysdialogFormVisible = true;
      axios.get("/api/main/sell/customer/show").then(resp => {
        console.log(resp.data);
        this.resuter = resp.data.list;
      });
    },
    // 修改
    addgysxg() {
      this.xgaddgysdialogFormVisible = true;
      axios.get("/api/main/sell/customer/show").then(resp => {
        console.log(resp.data);
        this.resuterxg = resp.data.list;
      });
    },
    // handleChange产品弹窗下拉列表
    handleChange(index, row) {
      this.radioo = row;
    },
    handleChangexg(index, row) {
      this.radiooxg = row;
    },
    // sureadgyx确定客户弹窗
    sureadgyx() {
      console.log(this.radioo);

      this.form.customerCode = this.radioo.customerCode;
      this.addgysdialogFormVisible = false;
    },
    sureadgyxxg() {
      this.formxg.customerCode = this.radiooxg.customerCode;
      this.xgaddgysdialogFormVisible = false;
    },
    // 主界面删除
    handleDelete(index, row) {
      console.log(row);
      requestPost("/api/main/sell/somain/delete", { soId: row.soId }).then(
        resp => {
          if (resp.data.code == 2) {
            this.aso();
          }
        }
      );
    },
    // axios请求主界面的数据,新增的
    aso() {
      axios({
        url: "/api/main/sell/somain/show",
        method: "get",
        params: { type: 1, page: this.page }
      }).then(resp => {
        this.arrlist = resp.data.list;
        this.pagess = resp.data.pages;
      });
    },
    // 添加新的销售单
    adduser() {
      console.log("新增销售单");
      this.sky = false;
      this.xzsky = false;
    },
    // 预付款
    payf(){
      if(this.form.payType == 3){
        this.disable = false
      }else{
        this.disable = true
        this.form.prePayFee = 0
      }
    },
    xgpayf(){
      if(this.formxg.payType == 3){
        this.xgdisable = false
      }else{
        this.xgdisable = true
      }
    },
    // 增加销售明细
    addmx() {
      this.cpmxsky = true;
      this.poitems.push({
        productCode: "",
        unitPrice: "",
        unitName: "",
        num: "",
        itemPrice: ""
      });
    },
    addmxxg() {
      this.poitemsxg.push({
        productCode: "",
        unitPrice: "",
        unitName: "",
        num: "",
        itemPrice: ""
      });
    },
    // 删除产品mingxi
    handleDeleteasd(index, row) {
      console.log(row);
      this.poitems.splice(index, 1);
      this.jsz();
    },
    handleDeleteasdxg(index, row) {
      console.log(row);
      this.poitemsxg.splice(index, 1);
      this.jszxg();
    },
    // 点击出现产品的选择
    cpxz(index, row) {
      this.cpindex = index;
      this.dv = true;
      axios.get("/api/main/sell/product/all").then(resp => {
        let sss = resp.data;
        this.cprest = sss;
      });
    },
    cpxzxg(index, row) {
      this.dvxg = true;
      this.index = index;
      axios.get("/api/main/sell/product/all").then(resp => {
        let sss = resp.data;
        this.cprestxg = sss;
      });
    },
    // sureyxfz产品选择弹窗确定
    sureyxfz() {
      this.poitems[this.cpindex].productCode = this.radioomx.productCode;
      this.poitems[this.cpindex].unitName = this.radioomx.unitName;
      this.poitems[this.cpindex].unitPrice = this.radioomx.price;
      this.poitems[this.cpindex].name = this.radioomx.name;

      this.dv = false;
    },
    sureyxfzxg() {
      this.poitemsxg[this.index].productCode = this.radioomxxg.productCode;
      this.poitemsxg[this.index].unitName = this.radioomxxg.unitName;
      this.poitemsxg[this.index].unitPrice = this.radioomxxg.price;
      this.poitemsxg[this.index].productName = this.radioomxxg.name;

      this.dvxg = false;
    },
    // cphandleChange产品选择弹窗对应
    cphandleChange(index, row) {
      this.radioomx = row;
      console.log(row);
    },
    cphandleChangexg(index, row) {
      this.radioomxxg = row;
    },
    // 计算
    pkuy(index, row) {
      this.form.tipFee = parseFloat(this.form.tipFee);
      if (row.num > 0 && row.unitPrice > 0) {
        row.itemPrice = row.num * row.unitPrice;
        this.form.productTotal = 0;
        for (let i = 0; i < this.poitems.length; i++) {
          this.form.productTotal += this.poitems[i].itemPrice;
        }
      } else {
        row.itemPrice = "";
      }
      this.form.soTotal = this.form.productTotal + this.form.tipFee;
    },
    jsz() {
      let s = 0;
      for (let i = 0; i < this.poitems.length; i++) {
        s += this.poitems[i].itemPrice;
      }
      this.form.soTotal = s + parseFloat(this.form.tipFee);
      this.form.productTotal = s;
    },
    jszxg() {
      let s = 0;
      for (let i = 0; i < this.poitemsxg.length; i++) {
        s += this.poitemsxg[i].itemPrice;
      }
      this.formxg.soTotal = s + parseFloat(this.formxg.tipFee);
      this.formxg.productTotal = s;
    },
    pkuyxg(index, row) {
      this.formxg.tipFee = parseFloat(this.formxg.tipFee);
      if (row.num > 0 && row.unitPrice > 0) {
        row.itemPrice = row.num * row.unitPrice;
        this.formxg.productTotal = 0;
        for (let i = 0; i < this.poitemsxg.length; i++) {
          this.formxg.productTotal += this.poitemsxg[i].itemPrice;
        }
      } else {
        row.itemPrice = "";
      }
      this.formxg.soTotal = this.formxg.productTotal + this.formxg.tipFee;
    },
    // 保存到后台
    save() {
      this.form["soitems"] = this.poitems;
      this.form["account"] = this.account;
      console.log(this.form);
      requestPostJson("/api/main/sell/somain/add", this.form).then(resp => {
        console.log(resp.data);
        if (resp.data.code == 2) {
          this.xzsky = true;
          this.sky = true;
          (this.cpmxsky = false),
            (this.xgsky = false),
            (this.xgcpxky = false),
            this.aso();
        }
      });
    },
    savexg() {
      this.formxg["soitems"] = this.poitemsxg;
      console.log(this.formxg);
      requestPostJson("/api/main/sell/somain/update", this.formxg).then(
        resp => {
          console.log(resp.data);
          if (resp.data.code == 2) {
            this.xzsky = true;
            this.sky = true;
            (this.cpmxsky = false),
              (this.xgsky = false),
              (this.xgcpxky = false),
              this.aso();
          }
        }
      );
    }
  },
  mounted() {
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
.ico {
  margin-top: 15px;
}
.fontab {
  color: black;
  font-size: 14px;
}
.inputc {
  width: 200px;
  height: 26px;
  margin-top: 8px;
}
.addmx {
  height: 186px;
  display: grid;
  grid-template-columns: repeat(3, 360px);
  grid-template-rows: repeat(3, 1fr);
  font-size: 14px;
  margin-top: 10px;
}
.addmx tr {
  border: 1px #ccc solid;
}
.addmx tr td:nth-child(1) {
  width: 100px;
  padding-left: 10px;
}
.bgcinput {
  background-color: #fff;
  border: 1px solid #ccc;
}
</style>