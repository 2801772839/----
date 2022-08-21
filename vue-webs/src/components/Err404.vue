<template>
  <el-result title="404" subTitle="抱歉，请求错误">
    <template slot="icon">
      <el-image
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      ></el-image>
    </template>
    <template slot="extra">
      <el-button type="primary" size="medium" @click="returnLogin">
        点我返回登录页
      </el-button>
    </template>
  </el-result>
</template>

<script>
export default {
  name: 'Error404',
  methods: {
    returnLogin() {
      this.$confirm('即将跳转到登录页面', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // 2秒钟跳转到登录页面 并且提示跳转成功
          setTimeout(() => {
            this.$message({
              type: 'success',
              message: '跳转成功!',
            })
            this.$router.push('/login')
          }, 2000)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消您的操作',
          })
        })
    },
  },
}
</script>

<style scoped>
/* .error-page {
  background: url('../assets/img/404.jpeg') no-repeat;
  background-position: center;
  margin: 0;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;


  <div class="error-page">
    <div style="padding: 100px 500px 0px 0px">
      <!-- <img src="../assets/img/404.jpeg" class="error-tag" /> -->
    </div>
  </div>
} */
</style>
