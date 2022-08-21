<template>
  <div class="topHi">
    <div style="margin: 0 25% 0 25%">
      <div>
        <el-card>
          <a href="https://cn.vuejs.org/">
            <img style="height: 50%; width: 50%" src="../assets/img/Vue.png" />
          </a>
        </el-card>
      </div>
      <div class="block">
        <el-timeline>
          <el-timeline-item timestamp="2022/4/25" placement="top">
            <el-card>
              <h4>项目完成</h4>
              <p>管理员 提交于 2022/5/18 00:30</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2022/4/25" placement="top">
            <el-card>
              <h4>完成前台页面</h4>
              <p>管理员 提交于 2022/5/15 19:00</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2022/4/25" placement="top">
            <el-card>
              <h4>完成用户权限管理</h4>
              <p>管理员 提交于 2022/5/10 13:50</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2022/4/25" placement="top">
            <el-card>
              <h4>创建项目</h4>
              <p>管理员 提交于 2022/5/3 12:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      src: '',
    }
  },
}
</script>
<style lang="css" scoped>
.topHi {
  background: url('../assets/img/locao.gif');
  background-repeat: no-repeat;
  background-size: 100%100%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
