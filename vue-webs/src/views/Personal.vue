<template>
  <div>
    <el-card style="width: 100%">
      <el-form ref="form" :model="form" label-width="80px">
        <div style="text-align: center; margin: 10px 0">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:9000/manage/upload/img/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="this.form.avatar"
          >
            <img
              v-if="this.form.avatar"
              :src="this.form.avatar"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <el-form-item label="用户名">
          <el-input v-model="form.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>

        <div style="text-align: center">
          <el-button type="primary" @click="onSubmit">更新信息</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'Personal',
  data() {
    return {
      form: {},
      // avatar: '',
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : {},
    }
  },
  created() {
    this.loud()
  },

  methods: {
    loud() {
      const username = this.user.username
      if (!username) {
        return
      }
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
        this.form = res.data.data[0]
      })
    },
    //更新信息
    onSubmit() {
      const username = this.user.username
      const password = this.form.password
      const nickname = this.form.nickname
      const address = this.form.address
      const avatar = this.form.avatar
      const token = this.user.token
      const data = {
        username: username,
        password: password,
        nickname: nickname,
        address: address,
        token: token,
        avatar: avatar,
      }
      const url = 'http://localhost:9000/manage/user/updateinfo/'
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          token: token,
        },
        data: qs.stringify(data),

        url,
      }
      this.$axios(options).then(res => {
        if (res.data.errCode === 200) {
          this.loud()
          this.$message.success('更新成功')
        } else {
          this.$message.error('更新失败')
        }
      })
    },

    handleAvatarSuccess(res, file) {
      this.form.avatar = URL.createObjectURL(file.raw)
      console.log(this.form.avatar)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
  },
}
</script>
<style lang="css" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
