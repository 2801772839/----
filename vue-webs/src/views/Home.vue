<template>
  <div>
    <el-container style="height: 100vh">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- 菜单 -->
        <el-menu
          :default-openeds="['1', '3']"
          style="min-height: 100vh; overflow-x: hidden"
          background-color="rgb(48,65,86)"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <div style="height: 60px; line-height: 60px; text-align: center">
            <img
              src="../assets/img/logo2.png"
              style="
                width: 30px;

                top: 5px;
                margin-right: 5px;
              "
            />
            <b style="color: #fff">后台管理系统</b>
          </div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>
              后台管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="/datalist">用户管理</el-menu-item>
              <el-menu-item index="/adminedit">文章管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>
              用户管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="/role">权限管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container sstyle="height: 100vh">
        <!-- 顶部 -->
        <el-header
          style="
            text-align: right;
            border-bottom: 1px solid red;
            font-size: 12px;
          "
        >
          <el-dropdown style="width: 500px">
            <span class="el-dropdown-link">
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
        </el-header>
        <!-- 内容 -->
        <router-view @refresh="getUser" />
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : {},
    }
  },
  created() {
    this.getUser()
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
          this.$router.push('/login')
          // 清除状态保持
          window.localStorage.clear()
        }, 2000)
      })
    },
    getUser() {
      let username = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : ''
      if (!username) {
        const data = { username: username }
        const url = 'http://localhost:9000/manage/user/info/'
        const options = {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(data),
          url,
        }
        this.$axios(options).then(res => {
          //数组转换成对象
          console.log(res.data.data[0])
          this.user = res.data.data[0]
        })
      }
    },
  },
}
</script>
<style>
.img-toto {
  width: 30px;
  border-radius: 50%;

  top: 10px;
  right: 5px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-dropdown-link {
  cursor: pointer;
  color: #143d02;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
