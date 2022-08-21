<template>
  <body id="paper">
    <el-form
      :model="loginForm"
      :rules="rules"
      class="login-container"
      label-position="left"
      label-width="0px"
      v-loading="loading"
    >
      <h3 class="login_title">用户注册</h3>
      <el-form-item prop="nickname">
        <el-input
          type="text"
          v-model="loginForm.nickname"
          auto-complete="off"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 40%; background: #505458; border: none"
          @click="login"
        >
          登录
        </el-button>
        <router-link to="register">
          <el-button
            type="primary"
            style="width: 40%; background: #505458; border: none"
            @click="register"
          >
            注册
          </el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </body>
</template>
<script>
// import axios from 'axios'

export default {
  data() {
    return {
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
      },
      checked: true,
      loginForm: {
        username: '',
        password: '',
        nickname: '',
      },
      loading: false,
    }
  },
  methods: {
    login() {
      this.$http
        .post('http://localhost:9000/manage/login', {
          username: this.loginForm.username,
          password: this.loginForm.password,
        })
        .then(res => {
          if (res.data.errCode === 200) {
            this.$notify({
              title: '成功',
              message: '欢迎您的访问',
              type: 'success',
            })
            localStorage.setItem('user', JSON.stringify(res.data.data))
            let path = this.$route.query.redirect
            this.$router.replace({
              path: path === '/' || path === undefined ? '/datalist' : path,
            })
            if (res.data.data.username === 'admin') {
            } else {
              this.$router.push('/')
            }
          }
        })
    },
    register() {
      this.$http
        .post('http://localhost:9000/manage/register', {
          username: this.loginForm.username,
          password: this.loginForm.password,
          nickname: this.loginForm.nickname,
        })
        .then(res => {
          if (res.data.errCode === 200) {
            this.login()
          }
        })
    },
  },
}
</script>
<style>
#paper {
  background: url('../assets/img/bg.jpeg') no-repeat;
  background-position: center;
  height: 100vh;
  width: 100vw;
  background-size: cover;
  position: fixed;
}
body {
  margin: -5px 0px;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_remember {
  margin: 0px 0px 35px 0px;
  text-align: left;
}
</style>
