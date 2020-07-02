<template>
  <div>
    <el-container>
      <el-header class="headerr" style="height:'120px'">
        <div class="onediv">
          <img src="/static/image/0.jpg" />
          <p>后台数据管理系统</p>
        </div>
        <div class="rightdiv">
          <i class="el-icon-s-custom" id="divi"></i>
          <p>{{user.account}}</p>
          <i class="el-icon-time" id="divi"></i>
          <p>系统时间：</p>
          <p>{{time}}</p>
        </div>
      </el-header>
      <el-container>
        <el-aside class="leftasd" width="230px">
          <el-row class="tac">
            <el-col :span="12">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#5383CF"
                @open="handleOpen"
                @close="handleClose"
                text-color="#fff"
                active-text-color="#2011D2"
                :unique-opened="true"
                router
              >
                <el-menu-item index class="elsubt">
                  <i class></i>
                  <span slot="title">菜单管理</span>
                </el-menu-item>
                <el-submenu index class="elsubt">
                  <template slot="title">
                    <i class="el-icon-document-remove"></i>
                    <span>管理信息</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/home">首页</el-menu-item>
                    <el-menu-item index="/administrator/Useradmin">用户管理</el-menu-item>
                    <el-menu-item index="/Escdel">退出</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index='2' class="elsubt">
                  <template slot="title">
                    <i class="el-icon-document-remove"></i>
                    <span>产品管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index='/sell/ClassifyList'>产品分类列表</el-menu-item>
                    <el-menu-item index='/sell/ListTow'>产品列表</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index='3' class="elsubt">
                  <template slot="title">
                    <i class="el-icon-document-remove"></i>
                    <span>采购管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/procurement/Sup">供应商管理</el-menu-item>
                    <el-menu-item index="/procurement/Newadd">新添采购单</el-menu-item>
                    <el-menu-item index="/procurement/Settle">采购单了结</el-menu-item>
                    <el-menu-item index="/procurement/Inquire">采购单查询</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index='4' class="elsubt">
                  <template slot="title">
                    <i class="el-icon-document-remove"></i>
                    <span>仓管管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/product/GodownEntry">入库登记</el-menu-item>
                    <el-menu-item index="/product/Removal">出库登记</el-menu-item>
                    <el-menu-item index="/product/ProductInquery">库存查询</el-menu-item>
                    <el-menu-item index="/product/Check">库存盘点</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index='5' class="elsubt">
                  <template slot="title">
                    <i class="el-icon-document-remove"></i>
                    <span>销售管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/sell/Client">客户管理</el-menu-item>
                    <el-menu-item index="/sell/NewaddSell">新添销售单</el-menu-item>
                    <el-menu-item index="/sell/SellSettle">销售单了结</el-menu-item>
                    <el-menu-item index="/sell/SellInquire">销售单查询</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index='6' class="elsubt">
                  <template slot="title">
                    <i class="el-icon-document-remove"></i>
                    <span>财务收支</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/finance/Payee">收款登记</el-menu-item>
                    <el-menu-item index="/finance/Payment">付款登记</el-menu-item>
                    <el-menu-item index="/finance/GeneralLedger">收支登记</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index='7' class="elsubt">
                  <template slot="title">
                    <i class="el-icon-document-remove"></i>
                    <span>月度报表</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index='/reportforms/MProcurement'>月度采购报表</el-menu-item>
                    <el-menu-item index='/reportforms/MSell'>月都销售报表</el-menu-item>
                    <el-menu-item index='/reportforms/MStock'>月度出库报表</el-menu-item>
                    <el-menu-item index='/reportforms/MiNstorage'>月度入库报表</el-menu-item>
                    <el-menu-item index='/reportforms/MRepertory'>月度库存报表</el-menu-item>
                    <el-menu-item index='/reportforms/MpayS'>月度收支报表</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      time: new Date().toLocaleString()
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  beforeCreate() {
     var _this = this; 
                this.timer = setInterval(function () {
                    _this.time = new Date().toLocaleString(); 
                }, 1000);
  },
 
};
</script>
<style  scoped>
.secter {
  margin-top: 24px;
}
.elsubt {
  width: 230px;
  background-color: #94b8f2;
}
.headerr {
  display: flex;
  justify-content: space-between;
  height: 120px;
  background: linear-gradient(to right, #8fcaf6, #287cc8, #285b8f, #8fcaf6);
}
.headerr img {
  width: 180px;
  height: 100px;
  margin-top: 10px;
  border-radius: 88px;
}
.leftasd {
  background-color: #5383cf;
}
i {
  color: #ffffff;
}
.onediv {
  display: flex;
}
.onediv p {
  font-size: 28px;
  text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
  font-weight: bold;
  color: white;
  margin-top: 42px;
  margin-left: 10px;
}
.rightdiv {
  display: flex;
  width: 340px;
  height: 40px;
  margin-top: 66px;
  border-radius: 20px;
  background-color: #376587;
  color: #ebfbfb;
  font-size: 14px;
}
#divi {
  text-align: center;
  width: 30px;
  height: 30px;
  padding-top: 13px;
  box-sizing: border-box;
  font-size: 18px;
}
</style>