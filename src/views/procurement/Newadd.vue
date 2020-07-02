<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>采购管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button v-show="sky" @click="adduser" class="bthend">
      <i class="el-icon-circle-plus-outline"></i> 添加
    </el-button>
    <div>
      <el-table
        :data="arrlist"
        stripe
        style="width:100%"
        class="fontab"
        v-show="sky"
        v-loading="loading"
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
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="kys">
      <form>
        <el-button type="success" @click="addmx">
          <i class="el-icon-circle-plus-outline"></i>
          增加明细
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
            <td>产品编号</td>
            <td>
              <input type="text" v-model="form.poId" class="inputc bgcinput" disabled />
            </td>
          </tr>
          <tr style="border-bottom:none">
            <td>创建时间</td>
            <td>
              <input type="text" v-model="form.createTime" class="inputc bgcinput" disabled />
            </td>
          </tr>
          <tr style="border-bottom:none">
            <td>供应商</td>
            <td>
              <input type="text" v-model="form.venderCode" class="inputc bgcinput" disabled />
            </td>
            <td @click="addgys">
              <i class="el-icon-edit-outline"></i>
            </td>

            <el-dialog title="供应商编号" :visible.sync="dialogFormVisible">
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
                <el-table-column label="供应商名称" prop="name" width="200px"></el-table-column>
                <el-table-column label="供应商编号" prop="venderCode" width="200px"></el-table-column>
              </el-table>

              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureadgyx">确 定</el-button>
              </div>
            </el-dialog>
          </tr>
          <tr style="border-bottom:none;border-top:none;background-color: #F5F8FA;">
            <td>创建用户</td>
            <td>
              <input type="text" v-model="account" class="inputc bgcinput" disabled />
              <!-- <el-input v-model="form.account">
                <template slot-scope="scope">
                  <span>{{scope.row.user.accout}}</span>
                </template>
              </el-input>-->
            </td>
          </tr>
          <tr style="border-bottom:none;border-top:none;background-color: #F5F8FA;">
            <td>附加费用</td>
            <td>
              <input type="text" v-model="form.tipFee" @input="jsz" class="inputc" />
            </td>
          </tr>
          <tr style="border-bottom:none;border-top:none;background-color: #F5F8FA;">
            <td>产品采购总价</td>
            <td>
              <input type="text" v-model="form.productTotal" class="inputc bgcinput" disabled />
            </td>
          </tr>
          <tr style=" border-top:none">
            <td>付款方式</td>
            <td>
              <el-select v-model="form.payType" placeholder="请选择付款方式" @change="payf" >
                <el-option label="货到付款" value="1"></el-option>
                <el-option label="款到发货" value="2"></el-option>
                <el-option label="预付款到发货" value="3"></el-option>
              </el-select>
            </td>
          </tr>
          <tr style="border-top:none">
            <td>采购总价</td>
            <td>
              <input type="text" v-model="form.poTotal" class="inputc bgcinput" disabled />
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
    <!-- 添加明细 -->
    <div v-show="mx">
      <el-table
        :data="poitems"
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
        
        <el-table-column label="数量单位" prop="unitName" width="140px">
          <template slot-scope="scope">
            <span>
              <input type="text" v-model="scope.row.unitName" class="bgcinput" disabled />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="数量单位" prop="name" width="140px">
          <template slot-scope="scope">
            <span>
              <input type="text" v-model="scope.row.name" class="bgcinput" disabled />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="产品单价" prop="unitPrice" width="180px">
          <template slot-scope="scope">
            <span>
              <input
                type="text"
                v-model="scope.row.unitPrice"
                @input="pkuy(scope.$index,scope.row)"
              />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="产品数量" prop="num" width="180px">
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
                <el-table-column label="产品编号" prop="productCode" width="200px"></el-table-column>
                <el-table-column label="产品名称" prop="name" width="200px"></el-table-column>
                <el-table-column label="数量单位" prop="unitName" width="200px"></el-table-column>
              </el-table>
        <div slot="footer" class="dialog-footer" width="200px">
          <el-button @click="dv = false">取 消</el-button>
          <el-button type="primary" @click="sureyx">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 修改新增采购单 -->
    <div v-show="!bgc">
      <p>修改</p>
      <form>
        <el-button type="success" @click="addmxfz">
          <i class="el-icon-circle-plus-outline"></i>
          增加明细
        </el-button>
        <el-button type="primary" @click="savefz">
          <i class="el-icon-document"></i>
          保存
        </el-button>
        <el-button type="danger" @click="xqbc">
          <i class="el-icon-circle-close"></i>
          取消
        </el-button>
        <table class="addmx">
          <tr style="border-bottom:none">
            <td>产品编号</td>
            <td>
              <input type="text" v-model="formfz.poId" class="inputc bgcinput" disabled />
            </td>
          </tr>
          <tr style="border-bottom:none">
            <td>创建时间</td>
            <td>
              <input type="text" v-model="formfz.createTime" class="inputc bgcinput" disabled />
            </td>
          </tr>
          <tr style="border-bottom:none">
            <td>供应商</td>
            <td>
              <input type="text" v-model="formfz.venderCode" class="inputc bgcinput" disabled />
            </td>
            <td @click="addgysxg">
              <i class="el-icon-edit-outline"></i>
            </td>

            <el-dialog title="供应商编号" :visible.sync="xgdialogFormVisible">
              
              <el-table :data="resuter" stripe style="width:100%" class="fontab">
                <el-table-column label="序号" width="100" type="index">
                  <template scope="scope">
                    <span>
                      <el-radio
                        v-model="radio"
                        :label="scope.$index"
                        @change="handleChangefz(scope.$index,scope.row)"
                      ></el-radio>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="供应商名称" prop="name" width="200px"></el-table-column>
                <el-table-column label="供应商编号" prop="venderCode" width="200px"></el-table-column>
              </el-table>
              <div slot="footer" class="dialog-footer">
                <el-button @click="xgdialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureadgyxfz">确 定</el-button>
              </div>
            </el-dialog>
          </tr>
          <tr style="border-bottom:none;border-top:none;background-color: #F5F8FA;">
            <td>创建用户</td>
            <td>
              <input type="text" v-model="account" class="inputc bgcinput" disabled />
              <!-- <el-input v-model="form.account">
                <template slot-scope="scope">
                  <span>{{scope.row.user.accout}}</span>
                </template>
              </el-input>-->
            </td>
          </tr>
          <tr style="border-bottom:none;border-top:none;background-color: #F5F8FA;">
            <td>附加费用</td>
            <td>
              <input type="text" v-model="formfz.tipFee" @input="jszxg" class="inputc" />
            </td>
          </tr>
          <tr style="border-bottom:none;border-top:none;background-color: #F5F8FA;">
            <td>产品采购总价</td>
            <td>
              <input type="text" v-model="formfz.productTotal" class="inputc bgcinput" disabled />
            </td>
          </tr>
          <tr style=" border-top:none">
            <td>付款方式</td>
            <td>
              <el-select v-model="formfz.payType" placeholder="请选择付款方式" @change="xgpayf">
                <el-option label="货到付款" value="1"></el-option>
                <el-option label="款到发货" value="2"></el-option>
                <el-option label="预付款到发货" value="3"></el-option>
              </el-select>
            </td>
          </tr>
          <tr style="border-top:none">
            <td>采购总价</td>
            <td>
              <input type="text" v-model="formfz.poTotal" class="inputc bgcinput" disabled />
            </td>
          </tr>
          <tr style="border-top:none">
            <td>最低付款金额</td>
            <td>
              <input type="text" v-model="formfz.prePayFee" :disabled = "xgdisable" class="inputc bgcinput" />
            </td>
          </tr>
          <tr style=" border-top:none">
            <td>备注</td>
            <td>
              <input type="text" v-model="formfz.remark" class="inputc" />
            </td>
          </tr>
        </table>
      </form>
    </div>
    <div v-show="mxfz">
      <el-table
        :data="arrlistmxpo"
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
        <el-table-column label="产品选择" prop="productCode" width="200px">
          <template slot-scope="scope">
            <span>
              <input type="text" v-model="scope.row.productCode" class="bgcinput" disabled />
            </span>
            <span>
              <i class="el-icon-edit-outline" @click="xgcpxz(scope.$index,scope.row)"></i>
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
        <el-table-column label="产品名称" prop="productName" width="140px">
          <template slot-scope="scope">
            <span>
              <input type="text" v-model="scope.row.productName" class="bgcinput" disabled />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="产品单价" prop="unitPrice" width="180px">
          <template slot-scope="scope">
            <span>
              <input
                type="text"
                v-model="scope.row.unitPrice"
                @input="pkuyfz(scope.$index,scope.row)"
              />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="产品数量" prop="num" width="180px">
          <template slot-scope="scope">
            <span>
              <input type="text" v-model="scope.row.num" @input="pkuyfz(scope.$index,scope.row)" />
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
      <el-dialog title="产品选择" :visible.sync="xgdv">
      我我
     <el-table :data="cprest" stripe style="width:100%" class="fontab">
                <el-table-column label="序号" width="100" type="index">
                  <template scope="scope">
                    <span>
                      <el-radio
                        v-model="radio"
                        :label="scope.$index"
                        @change="xgcphandleChange(scope.$index,scope.row)"
                      ></el-radio>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="产品编号" prop="productCode" width="200px"></el-table-column>
                <el-table-column label="产品名称" prop="name" width="200px"></el-table-column>
                <el-table-column label="数量单位" prop="unitName" width="200px"></el-table-column>
              </el-table>
        <div slot="footer" class="dialog-footer" width="200px">
          <el-button @click="xgdv = false">取 消</el-button>
          <el-button type="primary" @click="xgsureyxfz">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { requestPost } from "../../axioshttp/index";
import { mapState } from "vuex";
import { requestPostJson } from "../../axioshttpjson/index";
export default {
  data() {
    return {
      err: "",
      sky: "true",
      kys: false,
      page: 1,
      pagess: "",
      loading: true,
      cprest: [],
      rest: "",
      arrlist: [],
      mx: false,
      mxfz: false,
      bgc: "true",
      index: "",
      cpindex: "",
      froarm: {
        productCode: "",
        unitPrice: "",
        unitName: "",
        num: "",
        itemPrice: ""
      },

      newlist: {
        
      },
      xgnewlist: {
        
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
      xgdialogFormVisible: false,
      dv: false,
      xgdv: false,
      resuter: [],
      jso: [],
      arrlistmx: [],
      arrlistmxpo: [],
      radio: "",
      radioo: "",
      xgdisable:true,
      disable:true,
      radiooxg:'',
      form: {
        poId: new Date().format("yyyyMMddhhmmss"),
        createTime: new Date().format("yyyy-MM-dd hh:mm:ss"),
        venderCode: "",
        tipFee: 0,
        productTotal: "",
        poTotal: "",
        payType: "",
        prePayFee: "0",
        account: "",
        remark: ""
      },
      formfz: {},
      poitems: [],
      poitemsfz: [],
      formor: {
        name: "",
        venderCode: ""
      },
      formorfz: {
        name: "",
        venderCode: ""
      },
      formLabelWidth: "120px"
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
    // chanpin xuanze
    cpxz(index, row) {
      this.dv = true;
      this.cpindex = index;
      axios.get("/api/main/sell/product/all").then(resp => {
        let sss = resp.data;
        this.cprest = sss;
        console.log(sss);
        
      });
    },
    xgcpxz(index, row) {
      console.log(index, row, "adsdsads");
      this.index = index;
      this.xgdv = true;
      axios.get("/api/main/sell/product/all").then(resp => {
        let sss = resp.data;
        this.cprest = sss;
      });
    },
    // 计算

    // 计算zuizhong
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
      this.form.poTotal = this.form.productTotal + this.form.tipFee;
    },
    jsz() {
      let s = 0;
      for (let i = 0; i < this.poitems.length; i++) {
        s += this.poitems[i].itemPrice;
      }
      this.form.poTotal = s + parseFloat(this.form.tipFee);
      this.form.productTotal = s
    },
    jszxg() {
      let s = 0;
      for (let i = 0; i < this.arrlistmxpo.length; i++) {
        s += this.arrlistmxpo[i].itemPrice;
      }
      this.formfz.poTotal = s + parseFloat(this.formfz.tipFee);
      this.formfz.productTotal =s
    },
    pkuyfz(index, row) {
      if (row.num > 0 && row.unitPrice > 0) {
        row.itemPrice = row.num * row.unitPrice;
        this.formfz.productTotal = 0;
        for (let i = 0; i < this.arrlistmxpo.length; i++) {
          this.formfz.productTotal += this.arrlistmxpo[i].itemPrice;
        }
      } else {
        row.itemPrice = "";
      }
      this.formfz.poTotal = this.formfz.productTotal;
    },
    // 产品下拉框
    cphandleChange(index,row) {
      this.newlist = row
    
    },
    xgcphandleChange(index,row) {
      this.xgnewlist = row
    },
    // chanpin queding
    sureyx() {
      this.poitems[this.cpindex].productCode = this.newlist.productCode;
      this.poitems[this.cpindex].unitName = this.newlist.unitName;
      this.poitems[this.cpindex].name = this.newlist.name;

      this.dv = false;
    },

    xgsureyxfz() {
      this.arrlistmxpo[this.index].productCode = this.xgnewlist.productCode;
      this.arrlistmxpo[this.index].unitName = this.xgnewlist.unitName;
      
      this.arrlistmxpo[this.index].productName = this.xgnewlist.name

      this.xgdv = false;
    },
    // 预付款
    payf(){
      if(this.form.payType == 3){
        this.disable = false
      }else{
        this.disable = true
      }
    },
    xgpayf(){
      if(this.formfz.payType == 3){
        this.xgdisable = false
      }else{
        this.xgdisable = true
      }
    },
    // 删除明细
    handleDeleteasd(index, row) {
      // console.log(index, row);
      this.poitems.splice(index, 1);
      this.jsz()
    },
    handleDeleteasdxg(index, row) {
      // console.log(index, row);
      this.arrlistmxpo.splice(index, 1);
      this.jszxg()
    },
    // 保存到后台
    save() {
      this.form["account"] = this.account;
      this.form.tipFee = parseFloat(this.form.tipFee);
      this.form.productTotal = parseFloat(this.form.productTotal);
      this.form.poTotal = parseFloat(this.form.poTotal);
      this.form.payType = parseFloat(this.form.payType);
      this.form.prePayFee = parseFloat(this.form.prePayFee);
      // this.poitems.num = parseFloat(this.poitems.num);
      this.form.poId = parseFloat(this.form.poId);
      this.form.venderCode = this.form.venderCode.toString();
      //   this.jso=this.jso.push(this.froarm);
      // console.log(this.jso);

      this.form["poitems"] = this.poitems;
      this.form["status"] = 1;
      // console.log("数据",'poId:',this.form.poId,'venderCode:',this.form.venderName,'account:',this.form.account,'createTime:',this.form.createTime,'tipFee:',this.form.tipFee,'productTotal:',this.form.productTotal,'poTotal:',this.form.poTotal,'payType:',this.form.payType,'prePayFee:',this.form.prePayFee,'status:',1,'poitems:',[{productCode:this.froarm.productCode,unitPrice:this.froarm.unitPrice,num:this.froarm.num,unitName:this.froarm.unitName,itemPrice:this.froarm.itemPrice}]);
      console.log("shuju", this.form);
      console.log("acc", this.form.account);

      requestPostJson("/api/main/purchase/pomain/add", this.form).then(resp => {
        console.log(resp.data, "活了活了");
        if (resp.data.code == 2) {
          this.sky = true;
          this.kys = false;
          this.mx = false;
          this.bgc = true;
          this.mxfz = false;
         this.aso()
        }
      });
    },
    // 修改保存后台
    savefz() {
      console.log("修改保存");

      this.formfz.poitems = this.arrlistmxpo;
      console.log(this.formfz);
      requestPostJson("/api/main/purchase/pomain/update", this.formfz).then(
        resp => {
          console.log(resp.data, "活了修改活了");
          if (resp.data.code == 2) {
            this.sky = true;
          this.kys = false;
          this.mx = false;
          this.bgc = true;
          this.mxfz = false;
            this.aso();
          }
        }
      );
    },
    // quxiao
    xqbc(){
        this.sky = true;
          this.kys = false;
          this.mx = false;
          this.bgc = true;
          this.mxfz = false;
    },
    // 采购单编辑
    handleEdit(index, row) {
      this.formfz = row;
      axios({
        url: "/api/main/purchase/pomain/queryItem",
        method: "get",
        params: { poId: row.poId }
      }).then(resp => {
        let list = resp.data;
        // this.pagess = list.pages;

        this.arrlistmxpo = resp.data;
        console.log(this.arrlistmxpo,"5555");

        this.loading = false;
      });
      // this.formfz.poId = new Date().format("yyyyMMddhhmmss"),
      this.bgc = false;
      this.sky = false;
      this.mxfz = true;
      console.log("开心点，人间不值得", this.formfz);

      console.log(row, "166");
    },
    // 采购单删除
    handleDelete(index, row) {
      requestPost("/api/main/purchase/pomain/delete", { poId: row.poId }).then(
        resp => {
          if (resp.data.code == 2) {
            this.aso();
          }
        }
      );
    },
    // zengjiamingxi
    addmx() {
      this.poitems.push({
        productCode: "",
        unitPrice: "",
        unitName: "",
        num: "",
        itemPrice: ""
      });
      this.mx = true;
    },
    // addmxfz
    addmxfz() {
      console.log("852885285");
      
      this.arrlistmxpo.push({
        productCode: "",
        unitPrice: "",
        unitName: "",
        num: "",
        itemPrice: ""
      });
      
    },
    // queding
    sureadgyx() {
      this.form.venderCode = this.radioo;
      this.dialogFormVisible = false;
    },
    sureadgyxfz() {
      this.formfz.venderCode = this.radiooxg;
      this.xgdialogFormVisible = false;
    },
    //供应商下拉框
    handleChange(index, row) {
      this.radioo = row.venderCode;
    },
    handleChangefz(index,row) {
      console.log(row);
      this.radiooxg = row.venderCode
    },
    //添加供应商
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
    addgysxg() {
      (this.xgdialogFormVisible = true),
        axios.get("/api/main/purchase/vender/all").then(resp => {
          console.log(resp.data, "供应商列表");
          let rest = resp.data;
          this.resuter = rest;
          // this.formor.name = rest;
          // console.log("new",this.formor.name);
        });
    },
    // 添加
    adduser() {
      this.sky = false;
      this.kys = true;
    },
    aso() {
      // axios.get("/api/main/purchase/vender/all")
      axios({
        url: "/api/main/purchase/pomain/show",
        method: "get",
        params: { page: this.page, type: 1 }
      }).then(resp => {
        let list = resp.data;
        this.pagess = list.pages;
        console.log("256398", resp.data.list);
        this.arrlist = resp.data.list;
        this.loading = false;
      });
    }
  },
  // 计算数学

  // 监听器

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
.bthend {
  margin-top: 10px;
}
</style>