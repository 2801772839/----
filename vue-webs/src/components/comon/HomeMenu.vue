<template>
  <el-menu
    router
    mode="horizontal"
    background-color="#7da493"
    text-color="#222"
    active-text-color="blue"
    style="min-width: 1300px; width: 100%"
  >
    <el-menu-item index="/home">首页</el-menu-item>
    <el-menu-item index="/edit">写笔记</el-menu-item>
    <el-menu-item index="/read">看博客</el-menu-item>
    <span
      style="
        position: absolute;
        padding-top: 20px;
        right: 43%;
        font-size: 20px;
        font-weight: bold;
      "
    >
      XX后台管理系统
    </span>
    <div>
      <div v-if="!user.nickname" style="text-align: right; padding-right: 30px">
        <el-button @click="$router.push('/login')">登录</el-button>
        <el-button @click="$router.push('/register')">注册</el-button>
      </div>
      <div v-else>
        <el-dropdown style="width: 500px; right: -1160px; margin-top: 15px">
          <span
            class="el-dropdown-link"
            style="margin-top: 10px text-align:center"
          >
            <img :src="user.avatar" class="img-toto" />
            {{ user.nickname }}

            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="GoPersonal">
              个人信息
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="LogOut">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-menu>
</template>

<script>
export default {
  name: 'HomeMenu',
  data() {
    return {
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : {},
    }
  },

  methods: {
    GoPersonal() {
      this.$router.push('/personal')
    },

    LogOut() {
      this.$confirm('即将跳转到登录页面', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 2秒钟跳转到登录页面 并且提示跳转成功
        setTimeout(() => {
          this.$message({
            type: 'warning',
            message: '跳转成功!',
          })
          // 清除状态保持
          window.localStorage.clear()

          this.$router.push('/login')
        }, 2000)
      })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>
<style lang="css" scoped>
.nav-menu {
  /*margin-bottom: 40px;*/
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}
</style>
