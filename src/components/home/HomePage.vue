<template>
  <div>
    <div class="odiv">
      <img src="/static/image/1.jpg" alt />
      <h1>你好,欢迎使用后台数据管理系统</h1>
    </div>
    <div class="tdiv">
      <img src="/static/image/2.jpg" alt />
      <p>当前登录时间为{{time}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: new Date().toLocaleString()
    };
  },
  beforeCreate() {
    var _this = this;
    this.timer = setInterval(function() {
      _this.time = new Date().toLocaleString();
    }, 1000);
  }
};
</script>
<style  scoped>
.odiv {
  display: flex;
}
.tdiv {
  display: flex;
  margin-top: 10px;
}
.tdiv img {
  width: 30px;
  height: 30px;
  margin-top: 10px;
}
.odiv img {
  width: 80px;
  height: 70px;
}
</style>